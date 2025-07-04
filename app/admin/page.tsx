import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { AuthGuard } from '@/components/auth/auth-guard';

export const metadata = {
  title: 'Admin Dashboard - DevForge',
  description: 'Manage your website content and client inquiries.',
};

export default function AdminPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminDashboard />
    </AuthGuard>
  );
}