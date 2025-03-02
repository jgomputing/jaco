import { NextRequest, NextResponse } from 'next/server';
import { SettingsService, SettingInput } from '@/lib/services/settings-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/settings - Get all settings
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const includePrivate = searchParams.get('includePrivate') === 'true';
    
    // Fetch settings
    const settings = await SettingsService.getAllSettings(includePrivate);
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST /api/settings - Create or update a setting
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.key || body.value === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: key, value' },
        { status: 400 }
      );
    }
    
    // Create or update setting
    const settingData: SettingInput = {
      key: body.key,
      value: body.value,
      description: body.description,
      is_public: body.is_public
    };
    
    const setting = await SettingsService.upsertSetting(settingData);
    
    return NextResponse.json(setting);
  } catch (error) {
    console.error('Error creating/updating setting:', error);
    return NextResponse.json(
      { error: 'Failed to create/update setting' },
      { status: 500 }
    );
  }
}

// DELETE /api/settings - Delete a setting
export async function DELETE(request: NextRequest) {
  try {
    // Try both authentication methods
    const supabaseSession = await getSupabaseSession();
    const customSession = await getCustomSession();
    
    // If neither session exists, return unauthorized
    if (!supabaseSession && !customSession) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.key) {
      return NextResponse.json(
        { error: 'Missing required field: key' },
        { status: 400 }
      );
    }
    
    // Delete setting
    await SettingsService.deleteSetting(body.key);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting setting:', error);
    return NextResponse.json(
      { error: 'Failed to delete setting' },
      { status: 500 }
    );
  }
}