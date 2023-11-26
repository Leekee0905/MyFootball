import { ReactNode, useEffect, useCallback, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { getCurrentUserInfo } from '../api/login';
import { User } from '../types/user';

const Layout = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const fetchUserProfile = useCallback(async () => {
    const userProfileResponse = await getCurrentUserInfo();
    setUserProfile(userProfileResponse);
  }, []);

  useEffect(() => {
    console.log('page changed');
    fetchUserProfile();
  }, [children]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header userProfile={userProfile} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
