import { createServerClient } from '@/lib/supabase';
import { AdminOrdersClient } from '@/components/admin/AdminOrdersClient';

export default async function AdminOrdersPage() {
  const supabase = createServerClient();
  const { data: orders } = await supabase
    .from('orders')
    .select('*, items:order_items(quantity, unit_price, product:products(name))')
    .order('created_at', { ascending: false });

  return <AdminOrdersClient orders={orders ?? []} />;
}
