import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <main style={{ flex: 1, flexShrink: 0 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
