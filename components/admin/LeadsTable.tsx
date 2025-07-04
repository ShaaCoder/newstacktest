'use client'

import React from 'react'

type Lead = {
  name: string
  phone_number: string
  website: string
  query: string
  location: string
  createdAt: string
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-auto border rounded-xl shadow-md mt-6">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Website</th>
            <th className="p-3 border">Query</th>
            <th className="p-3 border">Location</th>
            <th className="p-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-3 border font-medium">{lead.name}</td>
              <td className="p-3 border">{lead.phone_number}</td>
              <td className="p-3 border text-blue-600 underline">
                <a href={lead.website} target="_blank" rel="noopener noreferrer">
                  {lead.website}
                </a>
              </td>
              <td className="p-3 border">{lead.query}</td>
              <td className="p-3 border">{lead.location}</td>
              <td className="p-3 border">{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
