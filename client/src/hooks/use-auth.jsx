import { useSelector } from 'react-redux';
import { getLocalStorage } from 'utils/common';

function useAuth() {
  const { profile } = useSelector((state) => state.user);
  const token = getLocalStorage('token');

  return Boolean(profile && token);
}

export default useAuth;
