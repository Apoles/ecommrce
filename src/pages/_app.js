// Global stil dosyası ve Redux store import edildi
import '@/styles/globals.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import store from '../Store/store'; // Redux store import edildi
import MainLayout from '@/components/Layout/MainLayout';
import UserLayout from '@/components/Layout/UserLayout';
import { checkLoginStatus } from '@/Store/authSlice'; // AuthSlice'tan giriş durumunu kontrol eden aksiyon import edildi
import MainLoadingSpinner from '@/components/LoadingUi/MainPageLoadingSpinner'; // Ana sayfa yükleme spinner'ı import edildi

// Uygulama içeriği bileşeni
function AppContent({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { loggedIn, status } = useSelector((state) => state.auth); // Redux store'dan kullanıcı giriş durumu ve durumu alınır
  console.log(loggedIn.success, '===>');

  // Giriş durumunu kontrol etme efekti
  useEffect(() => {
    if (status === 'idle') {
      dispatch(checkLoginStatus()); // Eğer durum 'idle' ise giriş durumunu kontrol eden aksiyonu tetikle
    }
  }, [status, dispatch, loggedIn]);

  // Yükleme durumunda spinner gösterimi
  if (status === 'loading' || status === 'idle') {
    return <MainLoadingSpinner />;
  }

  console.log(status, 'status');
  console.log(loggedIn, 'succeess');

  // Giriş yapılmışsa UserLayout kullan, değilse MainLayout kullan
  return (
    <>
      {loggedIn.success === true ? (
        <UserLayout>
          <Component {...pageProps} />
        </UserLayout>
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </>
  );
}

// Ana uygulama bileşeni, Redux store'u sağlar
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
