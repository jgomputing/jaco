import { NextRequest, NextResponse } from 'next/server';
import { SettingsService } from '@/lib/services/settings-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/settings/[key] - Get a setting by key
export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const key = params.key;
    
    // Fetch setting
    const value = await SettingsService.getSettingByKey(key);
    
    if (value === null) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ key, value });
  } catch (error) {
    console.error(`Error fetching setting (${params.key}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch setting' },
      { status: 500 }
    );
  }
}

// DELETE /api/settings/[key] - Delete a setting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const key = params.key;
    
    // Check if setting exists
    const value = await SettingsService.getSettingByKey(key);
    if (value === null) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      );
    }
    
    // Delete setting
    await SettingsService.deleteSetting(key);
    
    return NextResponse.json(
      { message: 'Setting deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting setting (${params.key}):`, error);
    return NextResponse.json(
      { error: 'Failed to delete setting' },
      { status: 500 }
    );
  }
}