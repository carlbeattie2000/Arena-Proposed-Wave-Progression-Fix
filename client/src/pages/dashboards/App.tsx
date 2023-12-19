import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './authentication/Login';
import { useState } from 'react';
import CreateTestData from './CreateTestData';
import NotFound from '../NotFound';

const router = createBrowserRouter([
{
  path: '*',
  element: <NotFound />
},
{
  path: '/dashboard',
  element: <Home />
},
{
  path: '/dashboard/create-test-data',
  element: <CreateTestData />
}
])

export default function App() {
  const [token, setToken] = useState<string>('');

  if (!token) {
    setToken("testing")
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
