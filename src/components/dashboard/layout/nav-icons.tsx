import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { Bag as BagsIcon } from '@phosphor-icons/react/dist/ssr/Bag';
import { Books as BooksIcon } from '@phosphor-icons/react/dist/ssr/Books';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  list: ListIcon,
  file: FileIcon,
  timer: TimerIcon,
  bag: BagsIcon,
  books: BooksIcon,
} as Record<string, Icon>;
