import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Lead } from '@/lib/models/Lead'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const location = searchParams.get('location')
  const fromDB = searchParams.get('from') === 'db'

  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if ((!query || !location) && !fromDB) {
    return new Response(JSON.stringify({ error: 'Missing params' }), { status: 400 })
  }

  await connectDB()

  // ✅ 1. Return saved leads from DB
  if (fromDB) {
    const mongoQuery: any = {}
    if (query) mongoQuery.query = query
    if (location) mongoQuery.location = location

    const savedLeads = await Lead.find(mongoQuery).sort({ createdAt: -1 }).lean()
    return new Response(JSON.stringify({ places: savedLeads }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ✅ 2. Fetch from Google Places API
  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+in+${location}&key=${apiKey}`
  const searchRes = await fetch(searchUrl)
  const searchData = await searchRes.json()

  // ✅ 3. Process each place and insert if not a duplicate
  const placesWithDetails = await Promise.all(
    (searchData.results || []).slice(0, 10).map(async (place: any) => {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website&key=${apiKey}`
      const detailsRes = await fetch(detailsUrl)
      const detailsData = await detailsRes.json()

      const result = {
        name: detailsData.result?.name || place.name,
        address: detailsData.result?.formatted_address || place.formatted_address,
        phone_number: detailsData.result?.formatted_phone_number || 'N/A',
        website: detailsData.result?.website || 'N/A',
        query,
        location,
        status: 'New',
      }

      // ✅ Try to insert — skip if already exists (due to unique index)
      try {
        const newLead = await Lead.create(result)
        return newLead
      } catch (error: any) {
        if (error.code === 11000) {
          // Duplicate: fetch and return the existing lead
          const existing = await Lead.findOne({
            name: result.name,
            address: result.address,
          }).lean()
          return existing
        } else {
          console.error('Lead creation error:', error)
          return null
        }
      }
    })
  )

  // ✅ 4. Return results, excluding any failed (null) leads
  return new Response(JSON.stringify({
    places: placesWithDetails.filter(Boolean),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
