import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from "./store.jsx";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { StrictMode } from 'react';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
