import { NextResponse, type NextRequest } from 'next/server';
import { getUserFromRequest } from '@/app/api/local-auth/route';
import { getProfileById } from '@/lib/local-db';
import * as db from '@/lib/local-db';

function getUser(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) return null;
  const profile = getProfileById(user.id);
  return { user, profile };
}

export async function POST(request: NextRequest) {
  const session = getUser(request);
  const body = await request.json();
  const { table, operation, data, filters, id } = body;

  // ---- AREAS ----
  if (table === 'areas' && operation === 'select') {
    return NextResponse.json({ data: db.getAllAreas(), error: null });
  }

  // ---- SEDES ----
  if (table === 'sedes') {
    if (operation === 'select') {
      return NextResponse.json({ data: db.getAllSedes(), error: null });
    }
    if (operation === 'insert') {
      const sede = db.createSede(data.name);
      return NextResponse.json({ data: sede, error: null });
    }
    if (operation === 'delete') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      db.deleteSede(filters.id);
      return NextResponse.json({ data: null, error: null });
    }
  }

  // ---- PROFILES ----
  if (table === 'profiles') {
    if (operation === 'select') {
      if (filters?.id) {
        const prof = db.getProfileById(filters.id);
        if (body.single) return NextResponse.json({ data: prof || null, error: null });
        return NextResponse.json({ data: prof ? [prof] : [], error: null });
      }
      if (filters?.role) {
        const prof = db.getProfileById(filters.id || '');
        return NextResponse.json({ data: prof, error: null });
      }
      // Get all (for admin user management)
      const profiles = db.getAllProfiles();
      return NextResponse.json({
        data: profiles.map(p => ({
          ...p,
          area: p.area_name ? { name: p.area_name } : null,
        })),
        error: null,
      });
    }
    if (operation === 'update') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      db.updateProfile(filters.id, data);
      return NextResponse.json({ data: null, error: null });
    }
  }

  // ---- PRODUCTS ----
  if (table === 'products') {
    if (operation === 'insert') {
      const product = db.createProduct(data);
      return NextResponse.json({ data: product, error: null });
    }
    if (operation === 'update') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      db.updateProduct(filters.id, data);
      return NextResponse.json({ data: null, error: null });
    }
    if (operation === 'delete') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      db.deleteProduct(filters.id);
      return NextResponse.json({ data: null, error: null });
    }
  }

  // ---- INVENTORY ITEMS ----
  if (table === 'inventory_items') {
    if (operation === 'select') {
      if (filters?.id && body.single) {
        const item = db.getInventoryItemById(filters.id);
        return NextResponse.json({ data: item, error: null });
      }

      const result = db.getInventoryItems({
        areaId: filters?.area_id,
        sedeId: filters?.sede_id,
        category: filters?.category,
        lowStock: filters?.lowStock,
        search: filters?.search,
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
        sortField: body.sortField,
        sortDir: body.sortDir,
        offset: body.offset,
        limit: body.limit,
      });

      return NextResponse.json({ data: result.data, count: result.count, error: null });
    }
    if (operation === 'insert') {
      const item = db.createInventoryItem(data);
      return NextResponse.json({ data: item, error: null });
    }
    if (operation === 'update') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      db.updateInventoryItem(filters.id, data);
      return NextResponse.json({ data: null, error: null });
    }
    if (operation === 'delete') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      db.deleteInventoryItem(filters.id);
      return NextResponse.json({ data: null, error: null });
    }
  }

  // ---- INVENTORY TRANSFER ----
  if (table === 'inventory_transfer' && operation === 'insert') {
    try {
      const result = db.transferInventory({
        sourceItemId: data.sourceItemId,
        targetSedeId: data.targetSedeId,
        quantity: data.quantity,
        updatedBy: data.updatedBy,
        notes: data.notes,
      });
      return NextResponse.json({ data: result, error: null });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }

  // ---- INVENTORY UPDATES (HISTORY) ----
  if (table === 'inventory_updates') {
    if (operation === 'insert') {
      db.createInventoryUpdate(data);
      return NextResponse.json({ data: null, error: null });
    }
    if (operation === 'select') {
      const result = db.getHistoryEntries({
        offset: body.offset,
        limit: body.limit,
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
      });
      return NextResponse.json({ data: result.data, count: result.count, error: null });
    }
  }

  // ---- RECENT UPDATES (for dashboard) ----
  if (table === '_recent_updates') {
    const data2 = db.getRecentUpdates(body.limit || 10);
    return NextResponse.json({ data: data2, error: null });
  }
  // ---- ORDERS ----
  if (table === 'orders') {
    if (operation === 'select') {
      if (filters?.id && body.single) {
        const order = db.getOrderById(filters.id);
        return NextResponse.json({ data: order, error: null });
      }
      const orders = db.getOrders({ areaId: filters?.area_id, status: filters?.status });
      return NextResponse.json({ data: orders, error: null });
    }
    if (operation === 'insert') {
      const order = db.createOrder(data);
      return NextResponse.json({ data: order, error: null });
    }
    if (operation === 'update') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      if (data.status) db.updateOrderStatus(filters.id, data.status);
      return NextResponse.json({ data: null, error: null });
    }
    if (operation === 'delete') {
      if (!filters?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      db.deleteOrder(filters.id);
      return NextResponse.json({ data: null, error: null });
    }
  }
  // ---- ORDER CATEGORIES ----
  if (table === 'order_categories') {
    const cats = db.getOrderCategories();
    return NextResponse.json({ data: cats, error: null });
  }

  return NextResponse.json({ error: `Unknown: ${table}/${operation}` }, { status: 400 });
}
