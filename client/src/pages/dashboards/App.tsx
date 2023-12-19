import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './authentication/Login';
import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState<string>("");

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
      <div>
      <BrowserRouter>
      <Routes>
      <Route path='/dashboard'>
      <Home />
      </Route>
      </Routes>
      </BrowserRouter>
      </div>
      )
}
