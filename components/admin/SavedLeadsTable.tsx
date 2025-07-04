'use client'

import { useEffect, useState } from 'react'

interface SavedLeadsTableProps {
  visible: boolean
}

export default function SavedLeadsTable({ visible }: SavedLeadsTableProps) {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [websiteFilter, setWebsiteFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const leadsPerPage = 5
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({})

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/search?from=db')
      const data = await res.json()
      setLeads(data.places || [])

      const initialStatus: { [key: string]: string } = {}
      data.places.forEach((lead: any) => {
        initialStatus[lead._id] = lead.status || 'New'
      })
      setStatusMap(initialStatus)
    } catch (err) {
      console.error('Failed to load saved leads:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setLeads(prev => prev.filter(lead => lead._id !== id))
        const updatedStatus = { ...statusMap }
        delete updatedStatus[id]
        setStatusMap(updatedStatus)
      } else {
        console.error('Delete failed')
      }
    } catch (err) {
      console.error('Failed to delete lead:', err)
    }
  }

  const handleStatusChange = (id: string, value: string) => {
    setStatusMap(prev => ({ ...prev, [id]: value }))
  }

  const handleStatusUpdate = async (id: string) => {
    const status = statusMap[id]
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      alert('Status updated successfully')
      fetchLeads()
    } catch (err) {
      console.error('Status update failed:', err)
    }
  }

  useEffect(() => {
    if (visible) fetchLeads()
  }, [visible])

  const filteredLeads = leads.filter((lead) => {
    const matchesName = lead.name.toLowerCase().includes(filter.toLowerCase())
    const matchesWebsite =
      websiteFilter === 'all' ||
      (websiteFilter === 'has' && lead.website && lead.website !== 'N/A') ||
      (websiteFilter === 'none' && (!lead.website || lead.website === 'N/A'))

    return matchesName && matchesWebsite
  })

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  )

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Saved Leads</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Filter by name..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="border border-gray-300 p-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
            value={websiteFilter}
            onChange={(e) => setWebsiteFilter(e.target.value)}
          >
            <option value="all">All Websites</option>
            <option value="has">Has Website</option>
            <option value="none">No Website</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading saved leads...</span>
        </div>
      ) : paginatedLeads.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No leads found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 text-left text-sm font-semibold">Name</th>
                <th className="p-4 text-left text-sm font-semibold">Address</th>
                <th className="p-4 text-left text-sm font-semibold">Phone</th>
                <th className="p-4 text-left text-sm font-semibold">Website</th>
                <th className="p-4 text-left text-sm font-semibold">Status</th>
                <th className="p-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((lead, index) => (
                <tr
                  key={lead._id}
                  className={`border-t transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50`}
                >
                  <td className="p-4 text-gray-800">{lead.name}</td>
                  <td className="p-4 text-gray-600">{lead.address}</td>
                  <td className="p-4 text-gray-600">{lead.phone_number}</td>
                  <td className="p-4">
                    <a
                      href={lead.website}
                      className="text-blue-600 hover:text-blue-800 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.website || 'N/A'}
                    </a>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={statusMap[lead._id] || 'New'}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-700"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button
                        onClick={() => handleStatusUpdate(lead._id)}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 bg-gray-50 rounded-b-lg">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              Showing {Math.min((currentPage - 1) * leadsPerPage + 1, filteredLeads.length)}–
              {Math.min(currentPage * leadsPerPage, filteredLeads.length)} of {filteredLeads.length}
            </p>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
