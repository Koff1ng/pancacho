import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import * as db from '@/lib/local-db';

const JWT_SECRET = 'la-comitiva-local-dev-secret-2024';
const COOKIE_NAME = 'lc_session';

function getAdminUser(request: NextRequest): { id: string; email: string } | null {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return null;
  try {
    const payload = jwt.verify(cookie, JWT_SECRET) as { sub: string };
    const user = db.getUserById(payload.sub);
    if (!user) return null;
    const profile = db.getProfileById(user.id);
    if (!profile || profile.role !== 'admin') return null;
    return user;
  } catch {
    return null;
  }
}

// GET: List all users (profiles)
export async function GET(request: NextRequest) {
  const admin = getAdminUser(request);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const profiles = db.getAllProfiles();
  return NextResponse.json(
    profiles.map(p => ({
      ...p,
      area: (p as any).area_name ? { name: (p as any).area_name } : null,
      username: (p as any).username || '',
    }))
  );
}

// POST: Create a new user
export async function POST(request: NextRequest) {
  const admin = getAdminUser(request);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { email, password, full_name, role, area_id } = await request.json();

  if (!email || !password || !full_name || !role) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  try {
    const result = db.createUser(email, password, full_name, role, area_id || null);
    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE: Delete a user
export async function DELETE(request: NextRequest) {
  const admin = getAdminUser(request);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { userId } = await request.json();
  if (!userId) return NextResponse.json({ error: 'userId requerido' }, { status: 400 });

  if (userId === admin.id) {
    return NextResponse.json({ error: 'No puedes eliminarte a ti mismo' }, { status: 400 });
  }

  try {
    db.deleteUser(userId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PATCH: Update a user's profile, username, and/or password
export async function PATCH(request: NextRequest) {
  const admin = getAdminUser(request);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { userId, full_name, role, area_id, username, password } = await request.json();
  if (!userId) return NextResponse.json({ error: 'userId requerido' }, { status: 400 });

  try {
    // Update profile fields
    const updates: Record<string, unknown> = {};
    if (full_name !== undefined) updates.full_name = full_name;
    if (role !== undefined) updates.role = role;
    if (area_id !== undefined) updates.area_id = area_id || null;
    if (Object.keys(updates).length > 0) {
      db.updateProfile(userId, updates);
    }

    // Update username if provided
    if (username !== undefined && username.trim()) {
      db.updateUsername(userId, username.trim());
    }

    // Update password if provided
    if (password && password.length >= 6) {
      db.updateUserPassword(userId, password);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
