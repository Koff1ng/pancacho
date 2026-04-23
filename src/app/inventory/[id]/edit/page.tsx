'use client';

import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter, useParams } from 'next/navigation';
import type { InventoryItem } from '@/lib/types';
import Navbar from '@/components/Navbar';

export default function EditProductPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;

  const [item, setItem] = useState<InventoryItem | null>(null);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('inventory_items')
        .select('*, product:products(*)')
        .eq('id', itemId)
        .single();

      if (data) {
        setItem(data as InventoryItem);
        setName(data.product?.name || '');
        setUnit(data.product?.unit || '');
        setQuantity(String(data.quantity));
        setCategory(data.product?.category || '');
        setNotes(data.product?.notes || '');
      }
    };
    load();
  }, [itemId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !item) return;

    const newQty = parseFloat(quantity);

    // Update product
    const { error: prodErr } = await supabase
      .from('products')
      .update({ name, unit, category: category || null, notes: notes || null })
      .eq('id', item.product_id);

    if (prodErr) {
      setError(prodErr.message);
      setLoading(false);
      return;
    }

    // Update inventory item
    if (newQty !== item.quantity) {
      await supabase
        .from('inventory_items')
        .update({
          quantity: newQty,
          updated_at: new Date().toISOString(),
          updated_by: user.id,
        })
        .eq('id', item.id);

      // Audit log
      await supabase.from('inventory_updates').insert({
        inventory_item_id: item.id,
        previous_qty: item.quantity,
        new_qty: newQty,
        updated_by: user.id,
        notes: 'Editado desde formulario',
      });
    }

    router.push('/inventory');
  };

  if (!item) {
    return (
      <>
        <Navbar />
        <div className="max-w-lg mx-auto p-4">
          <p className="text-[var(--text-muted)]">Cargando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium mb-1">Nombre</label>
            <input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-quantity" className="block text-sm font-medium mb-1">Cantidad</label>
              <input
                id="edit-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input-field"
                min="0"
                step="0.1"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-unit" className="block text-sm font-medium mb-1">Unidad</label>
              <select
                id="edit-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="input-field"
              >
                <option value="unidades">Unidades</option>
                <option value="kg">Kilogramos</option>
                <option value="lb">Libras</option>
                <option value="litros">Litros</option>
                <option value="paquetes">Paquetes</option>
                <option value="cajas">Cajas</option>
                <option value="botellas">Botellas</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium mb-1">Categoría</label>
            <input
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              placeholder="Ej: Alimentos, Bebidas"
              list="edit-category-suggestions"
            />
            <datalist id="edit-category-suggestions">
              <option value="Alimentos" />
              <option value="Bebidas" />
              <option value="Suministros" />
              <option value="Insumos" />
              <option value="Limpieza" />
              <option value="Frutas" />
              <option value="Carnes" />
              <option value="Lácteos" />
            </datalist>
          </div>

          <div>
            <label htmlFor="edit-notes" className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              id="edit-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field"
              rows={2}
            />
          </div>

          {error && (
            <div className="text-[var(--danger)] text-sm bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button type="button" onClick={() => router.back()} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
