import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { EmployeeAddForm } from '@/components/dashboard/books/employee-add-form';

export const metadata = { title: `Employee | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Add Employee</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={12} md={12} xs={12}>
          <EmployeeAddForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
