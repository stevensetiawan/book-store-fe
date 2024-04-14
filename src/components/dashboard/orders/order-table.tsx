'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { cancelOrder, getAttendances, selectAttendance } from '@/redux/reducers/order';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import type { Attendance } from '@/types/attendance';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
function noop(): void {
  // do nothing
}

export function AttendancesTable(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const attendanceState = useAppSelector(selectAttendance);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState( 5);
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const cancel = React.useCallback(async(order_id: number, total_points: number) => {
    try{
        const payload= {
          total_points,
          order_id
        }
        const promise = await dispatch(cancelOrder(payload)).unwrap()
        
        window.location.reload();
      } catch(e){

      }
    
    },[dispatch, router]
  )

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    closeDialog();
    // Add your confirmation logic here
  };
  const paginatedAttendances = attendanceState?.attendances ?? [];
  const onChangeRowsPerPage = React.useCallback((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  React.useEffect(() => {
    const promise = dispatch(getAttendances());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Points</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAttendances.length > 0 ? (
              paginatedAttendances.map((row) => {
                return (
                  <>
                  <TableRow hover key={row.id}>
                    <TableCell>
                      {row.id}
                    </TableCell>
                    <TableCell>
                      {row.quantity}
                    </TableCell>
                    <TableCell>{row.total_points}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => cancel(row.id, row.total_points)}>
                        Cancel Order
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign="center">Data not found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}

function applyPagination(rows: Attendance[], page: number, rowsPerPage: number): Attendance[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
