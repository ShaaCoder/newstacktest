'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminSidebar } from './admin-sidebar'
import { DashboardStats } from './dashboard-stats'
import { BlogManager } from './blog-manager'
import { QueryManager } from './query-manager'
import { UserManager } from './user-manager'
import Leads from './leads'
import SavedLeadsTable from './SavedLeadsTable'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 ml-64">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your website content and client inquiries</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="dashboard">
                <DashboardStats />
              </TabsContent>

              <TabsContent value="blog">
                <BlogManager />
              </TabsContent>

              <TabsContent value="queries">
                <QueryManager />
              </TabsContent>

              <TabsContent value="leads">
  <Leads />
  {/* <SavedLeadsTable visible={activeTab === 'leads'} /> */}
</TabsContent>


              <TabsContent value="users">
                <UserManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
