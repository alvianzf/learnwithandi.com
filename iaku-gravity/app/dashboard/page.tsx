
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ImportForm } from '@/components/import-form';
import { RegisterForm } from '@/components/register-form';
import { verifyJWT } from '@/lib/auth';
import { UserManagement } from '@/components/user-management';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('auth_token');

  if (!tokenCookie) {
    redirect('/login');
  }

  const payload = await verifyJWT(tokenCookie.value);
  if (!payload) {
    // Invalid token
    redirect('/login');
  }

  const role = payload.role as string;
  const username = payload.username as string;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{role === 'ADMIN' ? 'Admin Dashboard' : 'Alumni Dashboard'}</h1>

        <div className="grid gap-8">
          {role === 'ADMIN' && (
            <>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Import Alumni Data (CSV)</h2>
                <ImportForm />
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                <UserManagement />
              </div>
            </>
          )}

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Register New Alumni</h2>
            <RegisterForm isAdmin={role === 'ADMIN'} />
          </div>
        </div>
      </div>
    </div>
  );
}
