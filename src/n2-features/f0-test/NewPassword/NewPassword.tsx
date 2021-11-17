import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { Login } from '../Login';
import { RecoveryPassword } from '../RecoveryPass';

export const NewPassword = (): React.ReactElement => <RecoveryPassword />;
