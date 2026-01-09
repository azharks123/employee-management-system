import { CONST, handleLogout } from '../../utils/constants';

const ProtectedRoute = ({ children, requiredRole='' }) => {
  const userToken = localStorage.getItem(CONST.TOKEN);

  if (!userToken) {
    handleLogout()
  }

  return children;
};

export default ProtectedRoute;