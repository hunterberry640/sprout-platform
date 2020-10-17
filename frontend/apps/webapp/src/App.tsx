import { ErrorBoundaryAlert, ModalRoot, ModalsProvider } from '@savantly/sprout-ui';
import { uniqueId } from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import ModalProxy from './core/components/ModalProxy/ModalProxy';
import { PluginProvider } from './core/components/PluginProvider/PluginProvider';
import { ThemeProvider } from './core/utils/ConfigProvider';
import { initDevFeatures } from './dev';
import AppRoutes from './routes/AppRoutes';
import { history } from './store/configureStore';

export const App = ({ theme }: { theme: string }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }

  const location = useLocation();

  return (
    <ErrorBoundaryAlert style="page">
      <ThemeProvider>
        <ModalsProvider>
          <PluginProvider>
            <AppRoutes history={history} />
          </PluginProvider>
          <ModalProxy key={uniqueId()} />
          <ModalRoot />
        </ModalsProvider>
      </ThemeProvider>
    </ErrorBoundaryAlert>
  );
};

export default App;
