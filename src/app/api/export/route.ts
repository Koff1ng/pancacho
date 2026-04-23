import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import ExcelJS from 'exceljs';
import * as db from '@/lib/local-db';

const JWT_SECRET = 'la-comitiva-local-dev-secret-2024';
const COOKIE_NAME = 'lc_session';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  const payload = (() => { try { return jwt.verify(match[1], JWT_SECRET) as { sub: string }; } catch { return null; } })();
  if (!payload) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const profile = db.getProfileById(payload.sub);
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  // Optional sede filter
  const url = new URL(request.url);
  const sedeId = url.searchParams.get('sede') || undefined;

  const items = db.getAllInventoryForExport(sedeId);
  if (!items.length) return new NextResponse('No hay datos para exportar', { status: 200 });

  const wb = new ExcelJS.Workbook();
  wb.creator = 'La Comitiva - Sistema de Inventarios';
  wb.created = new Date();

  const COLORS = {
    primary: '1B4332',
    primaryLight: '2D6A4F',
    accent: '40916C',
    headerFont: 'FFFFFF',
    areaBg: 'D8F3DC',
    areaFont: '1B4332',
    catBg: 'E2E8F0',
    catFont: '334155',
    oddRow: 'F8F9FA',
    evenRow: 'FFFFFF',
    border: 'B7B7B7',
    lowStockBg: 'FFF3CD',
    lowStockFont: '856404',
  };

  const now = new Date();

  // Group items by category
  const byCategory: Record<string, typeof items> = {};
  for (const item of items) {
    const cat = String(item.product_category || 'Sin Categoría');
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(item);
  }
  const catNames = Object.keys(byCategory).sort();

  // ── Summary sheet ──
  const ws = wb.addWorksheet('Inventario General', { properties: { defaultColWidth: 18 } });

  ws.mergeCells('A1:F1');
  const title = ws.getCell('A1');
  const sedeName = sedeId && items[0]?.sede_name ? String(items[0].sede_name) : 'Todas las Sedes';
  title.value = `🍽️  La Comitiva — ${sedeName}`;
  title.font = { name: 'Calibri', size: 18, bold: true, color: { argb: COLORS.headerFont } };
  title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.primary } };
  title.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(1).height = 42;

  ws.mergeCells('A2:F2');
  const sub = ws.getCell('A2');
  sub.value = `Exportado el ${now.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las ${now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`;
  sub.font = { name: 'Calibri', size: 10, italic: true, color: { argb: COLORS.headerFont } };
  sub.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.primaryLight } };
  sub.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(2).height = 24;

  ws.getRow(3).height = 8;

  // Headers
  const headers = ['Área', 'Producto', 'Cantidad', 'Unidad', 'Notas', 'Última Actualización'];
  const hRow = ws.getRow(4);
  headers.forEach((h, i) => {
    const cell = hRow.getCell(i + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: COLORS.headerFont } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.accent } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = { bottom: { style: 'medium', color: { argb: COLORS.primary } } };
  });
  hRow.height = 28;

  let rowIdx = 5;

  for (const catName of catNames) {
    const catItems = byCategory[catName];

    // Category header row
    ws.mergeCells(`A${rowIdx}:F${rowIdx}`);
    const catRow = ws.getRow(rowIdx);
    const catCell = catRow.getCell(1);
    catCell.value = `📦  ${catName}  (${catItems.length} productos)`;
    catCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: COLORS.catFont } };
    catCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.catBg } };
    catCell.alignment = { vertical: 'middle' };
    catRow.height = 26;
    rowIdx++;

    for (let j = 0; j < catItems.length; j++) {
      const item = catItems[j];
      const row = ws.getRow(rowIdx);
      const isOdd = j % 2 === 0;
      const qty = Number(item.quantity) || 0;
      const isLow = qty <= 5;

      const vals = [
        String(item.area_name || ''),
        String(item.product_name || ''),
        qty,
        String(item.product_unit || ''),
        String(item.product_notes || ''),
        item.updated_at ? new Date(String(item.updated_at)).toLocaleString('es-CO') : '',
      ];

      vals.forEach((val, i) => {
        const cell = row.getCell(i + 1);
        cell.value = val;
        cell.font = { name: 'Calibri', size: 10 };
        cell.alignment = { vertical: 'middle', wrapText: i === 4 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isLow && i === 2 ? COLORS.lowStockBg : (isOdd ? COLORS.oddRow : COLORS.evenRow) } };
        cell.border = { bottom: { style: 'thin', color: { argb: COLORS.border } } };
        if (i === 2) { cell.alignment = { horizontal: 'center', vertical: 'middle' }; cell.numFmt = '#,##0.##'; if (isLow) cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.lowStockFont } }; }
        if (i === 3) cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
      row.height = 22;
      rowIdx++;
    }

    ws.getRow(rowIdx).height = 6;
    rowIdx++;
  }

  // Footer
  rowIdx++;
  ws.mergeCells(`A${rowIdx}:F${rowIdx}`);
  const footer = ws.getCell(`A${rowIdx}`);
  const lowCount = items.filter(i => (Number(i.quantity) || 0) <= 5).length;
  footer.value = `📊  Total: ${items.length} productos en ${catNames.length} categorías  |  ⚠️ Stock bajo (≤5): ${lowCount} productos`;
  footer.font = { name: 'Calibri', size: 10, italic: true, color: { argb: COLORS.primaryLight } };
  footer.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(rowIdx).height = 28;

  ws.getColumn(1).width = 16;
  ws.getColumn(2).width = 28;
  ws.getColumn(3).width = 12;
  ws.getColumn(4).width = 14;
  ws.getColumn(5).width = 30;
  ws.getColumn(6).width = 22;

  // ── Per-category sheets ──
  for (const catName of catNames) {
    const catItems = byCategory[catName];
    const sheetName = catName.substring(0, 31); // Excel max 31 chars
    const sheet = wb.addWorksheet(sheetName, { properties: { defaultColWidth: 16 } });

    sheet.mergeCells('A1:E1');
    const st = sheet.getCell('A1');
    st.value = `📦  ${catName}`;
    st.font = { name: 'Calibri', size: 16, bold: true, color: { argb: COLORS.headerFont } };
    st.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.primary } };
    st.alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.getRow(1).height = 36;

    sheet.getRow(2).height = 6;

    const sh = ['Producto', 'Cantidad', 'Unidad', 'Área', 'Notas'];
    const shRow = sheet.getRow(3);
    sh.forEach((h, i) => {
      const cell = shRow.getCell(i + 1);
      cell.value = h;
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: COLORS.headerFont } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.accent } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = { bottom: { style: 'medium', color: { argb: COLORS.primary } } };
    });
    shRow.height = 28;

    catItems.forEach((item, j) => {
      const row = sheet.getRow(j + 4);
      const isOdd = j % 2 === 0;
      const qty = Number(item.quantity) || 0;
      const isLow = qty <= 5;
      const vals = [String(item.product_name || ''), qty, String(item.product_unit || ''), String(item.area_name || ''), String(item.product_notes || '')];
      vals.forEach((val, i) => {
        const cell = row.getCell(i + 1);
        cell.value = val;
        cell.font = { name: 'Calibri', size: 10 };
        cell.alignment = { vertical: 'middle', wrapText: i === 4 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isLow && i === 1 ? COLORS.lowStockBg : (isOdd ? COLORS.oddRow : COLORS.evenRow) } };
        cell.border = { bottom: { style: 'thin', color: { argb: COLORS.border } } };
        if (i === 1) { cell.alignment = { horizontal: 'center', vertical: 'middle' }; cell.numFmt = '#,##0.##'; if (isLow) cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.lowStockFont } }; }
        if (i === 2 || i === 3) cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
      row.height = 22;
    });

    sheet.getColumn(1).width = 28;
    sheet.getColumn(2).width = 12;
    sheet.getColumn(3).width = 14;
    sheet.getColumn(4).width = 16;
    sheet.getColumn(5).width = 30;
  }

  const buffer = await wb.xlsx.writeBuffer();
  const dateStr = now.toISOString().split('T')[0];

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="Inventario_LaComitiva_${dateStr}.xlsx"`,
    },
  });
}
