import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {store , persistor} from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from './components/ThemeProvider.jsx'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>

        <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
