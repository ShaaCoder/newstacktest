'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UserManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            User management functionality will be implemented in the next version. 
            This will include user roles, permissions, and account management features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}