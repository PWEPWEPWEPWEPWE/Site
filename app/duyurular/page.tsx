import React from 'react';
import { duyurular } from '@/lib/duyurular';
import DuyurularClient from '@/components/DuyurularClient';

export const metadata = {
  title: 'Duyurular | AuraX Studio',
  description: 'AuraX Studio hakkında en güncel duyurular ve sistem güncellemeleri.',
};

export default function DuyurularPage() {
  return <DuyurularClient duyurular={duyurular} />;
}
