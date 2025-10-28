import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Panel - WatchGenius',
  description: 'Admin panel for managing WatchGenius platform',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminProducts() {
  return <AdminClient />;
}
