// src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header/index.jsx';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
