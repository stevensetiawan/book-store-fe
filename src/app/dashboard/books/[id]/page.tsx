import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { EmployeeDetail } from '@/components/dashboard/books/employee-detail';

export const metadata = { title: `Employee | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page({ params }: { params: { id: string } }): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <EmployeeDetail employeeId={parseInt(params.id, 10)} />
    </Stack>
  );
}
