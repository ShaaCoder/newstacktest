'use client'

import { useState } from 'react'
import LeadSearchForm from '@/components/admin/LeadSearchForm'
import LeadResults from '@/components/admin/LeadResults'
import SavedLeadsTable from '@/components/admin/SavedLeadsTable'

export default function Leads() {
  const [results, setResults] = useState<any[]>([])
  const [showSaved, setShowSaved] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-5xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Lead Management
          </h1>
          
          {/* Search and Results Section */}
          <div className="space-y-6">
            <LeadSearchForm onResults={setResults} />
            <LeadResults results={results} />
          </div>

          {/* Toggle Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="flex items-center gap-2">
                {showSaved ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Hide Saved Leads
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Show Saved Leads
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Saved Leads Table */}
          {showSaved && (
            <div className="mt-6 animate-fade-in">
              <SavedLeadsTable visible={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}