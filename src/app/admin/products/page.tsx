import { createServerClient } from '@/lib/supabase';
import { AdminProductsClient } from '@/components/admin/AdminProductsClient';

export default async function AdminProductsPage() {
  const supabase = createServerClient();
  const { data: products } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .order('created_at', { ascending: false });

  return <AdminProductsClient products={products ?? []} />;
}
