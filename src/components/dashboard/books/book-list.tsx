'use client';

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectEmployee } from '@/redux/reducers/employee';
import { fetchBooks } from '@/redux/reducers/book';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { Book, Employee } from '@/types/book';
import { CardContent, Chip, CircularProgress, Grid, Snackbar, SnackbarOrigin } from '@mui/material';
import { addToCart } from '../../../redux/reducers/cart';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/store';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function noop(): void {
  // do nothing
}

interface State extends SnackbarOrigin {
  open: boolean;
}

export function EmployeesTable(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { books, hasMore, loading, error } = useAppSelector((state: AppState) => state.book);
  const [initialDataLoaded, setInitialDataLoaded] = React.useState(false);
  const currentPage = useAppSelector((state: AppState) => state.book.currentPage);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      open: false,
    }))
  };
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    if (scrollPercentage >= 0.8 && !loading && hasMore) {
      dispatch(fetchBooks(currentPage)); // Load more data when user scrolls to 80% of the page height     
    }
  };
  
React.useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [loading, hasMore]);

React.useEffect(() => {
  if (!initialDataLoaded) {
    dispatch(fetchBooks(currentPage)); // Fetch initial data only if it hasn't been loaded yet
    setInitialDataLoaded(true);
  }
}, [initialDataLoaded, dispatch]);

  const handleBuy = (book: Book, newState: SnackbarOrigin) => {
    dispatch(addToCart(book));
    setState((prevState) => ({
      ...prevState,
      open: true,
    }));
  // Pass the product to the addToCart function
  };

  return (
    <React.Fragment>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert
          onClose={handleClose}
          variant="outlined" 
          color="success"
          severity="success"
          sx={{ width: '100%', backgroundColor: 'white' }}
        >
          Success add to cart!
        </Alert>
      </Snackbar>
    <Grid container spacing={2}>
      {books?.map(book => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>       
          <Card sx={{ width: '100%', height: '100%', marginBottom: '16px' }}>
            <CardMedia
              component="img"
              style={{ width: '100%', height: '250'}}        
              image={book?.cover_image}
              src={book?.cover_image}
              alt={book?.title}
            />
            <CardContent>
              <Grid item xs={6} sx={{height: 70, width: '120%'}}>
                <Typography 
                  variant="h5"
                  sx={{
                    width: '100%', // Ensures the title takes up the full width of the card
                    overflowWrap: 'hidden',
                    wordWrap: 'break-word',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {book?.title}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body2" color="text.secondary">
                  Writer: {book?.writer}
                </Typography>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                Price: {book?.point} points
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tags: {book?.tags.map(tag => <Chip key={tag} label={tag} variant="outlined" />)}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button variant="contained" color="primary" onClick={()=>handleBuy(book)}>
                Add to Cart
              </Button>
            </Box>
          </Card>  
        </Grid>
      ))}
      {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
      {error && <div>{error}</div>}
    </Grid>
  </React.Fragment>
  );
}

function applyPagination(rows: Book[], page: number, rowsPerPage: number): Book[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

