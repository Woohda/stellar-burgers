import '../../index.css';
import styles from './app.module.css';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch  } from '../../services/hooks/appHooks'
import { fetchIngredients } from '../../services/slices/ingredients/actions';
import { ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
  import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
  


const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useAppDispatch();

  useEffect(() => { 
    dispatch(fetchIngredients());
   
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location} >;
        <Route path='*' element={<NotFound404 />} />;
        <Route path='/' element={<ConstructorPage />} />;
        <Route path='/ingredients/:id' element={<IngredientDetails />} />;
        <Route path='/feed' element={<Feed />} />;
        <Route path='/feed/:number' element={<OrderInfo />} />;
        <Route path='/login' element={<Login />} />;
        <Route path='/register' element={<Register />} />;
        <Route path='/forgot-password' element={<ForgotPassword />} />;
        <Route path='/reset-password' element={<ResetPassword />} />;
        <Route path='/profile'>;
          <Route index element={<Profile />} />;
          <Route path='orders' element={<ProfileOrders/>} />;
        </Route>;
      </Routes>
      { backgroundLocation &&
        <Routes>
          <Route path="/feed/:number" element={
            <Modal title={''} onClose={() => history.back()}>
              <OrderInfo />
            </Modal>
          } />;
          <Route path="/ingredients/:id" element={
            <Modal title='Детали ингредиента' onClose={() => history.back()}>
              <IngredientDetails />
            </Modal>
          } />;
          <Route path="/profile/orders/:number" element={
            <Modal title={''} onClose={() => history.back()}>
              <IngredientDetails />
            </Modal>
          } />;
        </Routes>
      }
    </div>
  )
};

export default App;




  
