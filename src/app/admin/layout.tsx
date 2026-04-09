import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/admin');

  // Check admin role in user metadata
  const isAdmin = user.user_metadata?.role === 'admin';
  if (!isAdmin) redirect('/');

  return (
    <div className="min-h-screen bg-graphite-950 flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
