import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/dashboards/App';
import { ChakraProvider } from '@chakra-ui/react';
import ShortcutPopup from './components/ShortcutPopup';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ShortcutPopup modifier="shift" shortcutKey="B" label="search for user" />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
