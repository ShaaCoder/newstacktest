'use client';

import { Button } from '@/components/ui/button';
import { Code2, BarChart3, FileText, MessageSquare, Users, LogOut } from 'lucide-react';
import Link from 'next/link';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { name: 'Dashboard', id: 'dashboard', icon: BarChart3 },
  { name: 'Blog Posts', id: 'blog', icon: FileText },
  { name: 'Client Queries', id: 'queries', icon: MessageSquare },
  { name: 'Leads', id: 'leads', icon: Users },
  { name: 'Users', id: 'users', icon: Users },
];

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NewStack</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Button>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}