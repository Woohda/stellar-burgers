import '../../index.css';
import styles from './app.module.css';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword } from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useAppDispatch  } from '../../services/hooks/appHooks'
import { fetchIngredients } from '../../services/slices/ingredients/actions';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { fetchUser } from '../../services/slices/user/actions';
import { PageComponent } from '../page-component/page-component';
  
const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useAppDispatch();

  useEffect(() => { 
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location} >;
        <Route path='*' element={<NotFound404 />} />;
        <Route path='/' element={<ConstructorPage />} />;
        <Route path='/ingredients/:id' element={
          <PageComponent title='Детали ингредиента' >
            <IngredientDetails />
          </PageComponent>
        } />;
        <Route path='/feed' element={<Feed />} />;
        <Route path='/feed/:number' element={
          <PageComponent title={`Информация по заказу №${parseInt(location.pathname.split('/').reverse()[0])}`} >
            <OrderInfo />
          </PageComponent> 
        } />;
        <Route path='/login' element={<OnlyUnAuth component={<Login />}/>} />;
        <Route path='/register' element={<OnlyUnAuth component={<Register />}/>} />;
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />}/>} />;
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />}/>} />;
        <Route path='/profile'>;
          <Route index element={<OnlyAuth component={<Profile />}/>} />;
          <Route path='orders' element={<OnlyAuth component={<ProfileOrders />}/>} />;
          <Route path='orders/:number' element={<OnlyAuth component={
            <PageComponent title={`#${parseInt(location.pathname.split('/').reverse()[0])}`} > 
              <OrderInfo />
            </PageComponent> 
          }/>} />;
        </Route>;
      </Routes>
      { backgroundLocation &&
        <Routes>
          <Route path="/feed/:number" element={
            <Modal 
              title={`#${parseInt(location.pathname.split('/').reverse()[0])}`} 
              onClose={() => history.back()}
            >
              <OrderInfo />
            </Modal>
          } />;
          <Route path="/ingredients/:id" element={
            <Modal title='Детали ингредиента' onClose={() => history.back()}>
              <IngredientDetails />
            </Modal>
          } />;
          <Route path="/profile/orders/:number" element={<OnlyAuth component={
            <Modal 
              title={`#${location.pathname.match(/\d+/)}`} 
              onClose={() => history.back()}
            >
              <OrderInfo />
            </Modal>
          }/>} />;
        </Routes>
      }
    </div>
  )
};

export default App;




  
