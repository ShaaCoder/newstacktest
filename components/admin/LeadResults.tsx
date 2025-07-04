'use client'

export default function LeadResults({ results }: { results: any[] }) {
  if (results.length === 0) return null

  const exportToCSV = () => {
    const header = ['Name', 'Address', 'Phone', 'Website']
    const rows = results.map(place => [
      `"${place.name}"`,
      `"${place.address}"`,
      `"${place.phone_number}"`,
      `"${place.website}"`,
    ])
    const csvContent = [header, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'leads.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="mt-6">
      <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 mb-4 rounded">
        Download CSV
      </button>
      <ul className="space-y-2">
        {results.map((place, i) => (
          <li key={i} className="border p-3 rounded bg-white shadow-sm">
            <div className="font-bold text-lg">{place.name}</div>
            <div>{place.address}</div>
            <div>📞 {place.phone_number}</div>
            {place.website && (
              <div>
                🌐{' '}
                <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {place.website}
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
