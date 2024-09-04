import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser } from '../../services/slices/user/UserSlice';
import { useAppSelector } from '../../services/hooks/appHooks';

export const AppHeader: FC = () =>{
    const user = useAppSelector(getUser);
    return <AppHeaderUI userName={'' || user?.name}/>;
} 
