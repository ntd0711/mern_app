import useAuthStore from 'store/authStore';

function useAuth() {
  const { user, token, refreshToken } = useAuthStore();
  return Boolean(user && token && refreshToken);
}

export default useAuth;
