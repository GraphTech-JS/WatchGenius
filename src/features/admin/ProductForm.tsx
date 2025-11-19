/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';
import { IProduct } from '@/types/product';

interface ProductFormProps {
  type: 'products' | 'knowledge-base' | 'prompts';
  mode: 'add' | 'edit';
  initial?: IProduct;
  onSubmit: (data: IProduct) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  type,
  mode,
  initial,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<IProduct>({
    name: '',
    category: '',
    price: '',
    quantity: 0,
    description: '',
    lastUsage: '',
    ...initial,
  });

  useEffect(() => {
    if (initial) setForm((f) => ({ ...f, ...initial }));
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔔 ProductForm.handleSubmit:', form);
    onSubmit(form);
  };

  return (
    <div className='z-50 space-y-4'>
      <h2 className='text-2xl font-semibold text-gray-800'>
        {mode === 'add' ? 'Додати' : 'Редагувати'}{' '}
        {type === 'products'
          ? 'товар'
          : type === 'knowledge-base'
          ? 'запис'
          : 'промпт'}
      </h2>

      {[
        ['name', 'Назва'],
        ['category', 'Категорія'],
        ['price', 'Ціна'],
      ].map(([field, label]) => (
        <div key={field} className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            {label}
          </label>
          <input
            name={field}
            type='text'
            value={(form as any)[field] as string}
            onChange={handleChange}
            required
            className='px-3 py-2 w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      ))}

      {type === 'products' && (
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Кількість
          </label>
          <input
            name='quantity'
            type='number'
            value={form.quantity ?? 0}
            onChange={handleChange}
            required
            className='px-3 py-2 w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      )}

      {type === 'knowledge-base' && (
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>Опис</label>
          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className='px-3 py-2 w-full rounded border resize-y focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      )}

      {type === 'prompts' && (
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Останнє використання
          </label>
          <input
            name='lastUsage'
            type='text'
            value={form.lastUsage}
            onChange={handleChange}
            required
            className='px-3 py-2 w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      )}

      <div className='flex justify-end pt-4 space-x-2 border-t border-gray-200'>
        <Button variant='outline' type='button' onClick={onCancel}>
          Скасувати
        </Button>
        <Button type='submit' onClick={handleSubmit}>
          {mode === 'add' ? 'Додати' : 'Зберегти'}
        </Button>
      </div>
    </div>
  );
};
