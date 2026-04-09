import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, createAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const bucket = (formData.get('bucket') as string) ?? 'products';

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const admin = createAdminClient();
  const { error } = await admin.storage.from(bucket).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = admin.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: publicUrl });
}
