import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/components/ReduxProvider';

export const metadata: Metadata = {
  title: 'Knowledge Graph',
  description: 'Interactive knowledge graph viewer for mapping topics and relationships',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 text-gray-900">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
