import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { EmployeesFilters } from '@/components/dashboard/books/employees-filters';
import { EmployeesTable } from '@/components/dashboard/books/book-list';

export const metadata = { title: `Employees | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
 
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Book List</Typography>
        </Stack>
      </Stack>
      <EmployeesTable />
    </Stack>
  );
}
