import * as React from 'react';
import { baseTheme } from 'themes';
import { GlobalStyle } from './GlobalStyle';
import { Providers } from './Providers';
import { Redirect, Route, Switch } from 'react-router';
import { ActionModals } from './components/ActionModals';
import { Crosschain } from './pages/Crosschain'
import { InfoModal } from './components/InfoModal';

export const App: React.FC = () => (
  <Providers>
    <React.Suspense fallback={<div />}> 
      <Switch>
        <Route exact path="/:token" component={Crosschain} />
        <Route
          exact
          path="/:token/operations/:operationId"
          component={Crosschain}
        />
        <Redirect to="/busd" />  
      </Switch>
    </React.Suspense>
    <ActionModals />
    <InfoModal />
    <GlobalStyle theme={...baseTheme as any} />
  </Providers>
);
