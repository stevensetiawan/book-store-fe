import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  {
    key: 'Books',
    title: 'Books',
    href: paths.dashboard.books,
    icon: 'books',
    matcher: {
      href: paths.dashboard.books,
      type: 'startsWith',
    },
  },
  { key: 'Order', title: 'Order', href: paths.dashboard.orders, icon: 'bag' },
] satisfies NavItemConfig[];
