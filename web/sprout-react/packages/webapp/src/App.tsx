import {
  ConfirmModal,
  ErrorBoundaryAlert,
  getTheme,
  ModalRoot,
  ModalsProvider,
  ThemeContext
} from "@savantly/sprout-ui";
import { uniqueId } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import "./App.css";
import ModalProxy from "./core/components/ModalProxy/ModalProxy";
//import './assets/stolen.css';
//import './sass/grafana.dark.scss';
import { ThemeProvider } from "./core/utils/ConfigProvider";
import { initDevFeatures } from "./dev";
import AppRoutes from "./routes/AppRoutes";
import { history } from "./store/configureStore";
import { store } from "./store/store";


export const App = ({ theme }: { theme: string }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    initDevFeatures();
  }

  const _theme = getTheme(theme);

  return (
      <Provider store={store}>
        <Router history={history}>
          <ErrorBoundaryAlert style="page">
            <ThemeProvider>
              <ModalsProvider >
                <AppRoutes history={history} />
                <ModalProxy key={uniqueId()} />
                <ModalRoot />
              </ModalsProvider>
            </ThemeProvider>
          </ErrorBoundaryAlert>
        </Router>
      </Provider>
  );
};

export default App;
