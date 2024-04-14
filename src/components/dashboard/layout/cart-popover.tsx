import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { Book as BookIcon } from '@phosphor-icons/react/dist/ssr/Book';

import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, removeFromCart, selectCartItems, clearCart, updateCartItemQuantity } from '../../../redux/reducers/cart';
import { Book } from '@/types/book';
import { Button, Grid, List, ListItem } from '@mui/material';
import { useAppDispatch } from '@/redux/hooks';
export interface CartPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function CartPopover({ anchorEl, onClose, open }: CartPopoverProps): React.JSX.Element {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleIncrement = (id: number) => {
    dispatch(updateCartItemQuantity({ id, quantity: 1 }));
  };

  const handleDecrement = (id: number) => {
    dispatch(updateCartItemQuantity({ id, quantity: -1 }));
  };

  const checkout = React.useCallback(
    async (cartItems: Book[]): Promise<void> => {
      try {
        const promise = await dispatch(createOrder(cartItems)).unwrap();
        await dispatch(clearCart())
        router.push('/dashboard/orders');
      } catch (error) {
      }
    },
    [dispatch, router]
  );
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
      sx={{marginBottom: '16px'}}
    >
      
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
      {cartItems.cart?.map((item: Book, index: number) => (
        <React.Fragment>
          <div key={item.id} style={{
            width: '100%', // Ensures the title takes up the full width of the card
            wordWrap: 'break-word',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            <Grid container spacing={2} >
                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: 1 }}>
                  {item.title}
                  <br/>
                  {item.point} points
                </Grid>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: 1 }}>
                <Button onClick={() => handleDecrement(item.id)}>-</Button>          
                {item.quantity}
                <Button onClick={() => handleIncrement(item.id)}>+</Button>
              </Box>
            </Grid>
          </div>
            {index < cartItems.cart?.length! - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // height: '100%', // Set the height of the container to match the parent element
        }}
      >
        { cartItems.cart?.length! > 0 && ( 
          <Button variant="contained" color="primary" onClick={() => checkout(cartItems.cart!)}>
            Checkout
          </Button>
        )}
      </Box>
    </Popover>
  );
}

