'use client';

/* Core */
import * as React from 'react';
import { Provider } from 'react-redux';

/* Instruments */
import store from './store';

export function Providers(props: React.PropsWithChildren): React.JSX.Element {
  return <Provider store={store}>{props.children}</Provider>;
}
