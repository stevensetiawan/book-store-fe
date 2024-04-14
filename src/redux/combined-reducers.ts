import order from './reducers/order';
import book from './reducers/book';
import user from './reducers/user';
import cart from './reducers/cart';

const combinedReducers = {
  order,
  user,
  book,
  cart
};

export default combinedReducers;
