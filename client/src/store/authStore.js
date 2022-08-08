import { userApi } from 'api/user-api';
import TYPES from 'constants/action-types';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
const reducer = (state, { type, payload }) => {
  console.log({ type, payload });
  switch (type) {
    case TYPES.UNSET_AVATAR: {
      state.user.avatar = '';
      break;
    }
    case TYPES.UPLOAD_AVATAR: {
      state.user.avatar = payload?.newAvatar;
      break;
    }
    case TYPES.CHANGE_INFO_USER: {
      state.user = payload.user;
      break;
    }
    default: {
      return;
    }
  }
};

const useAuthStore = create(
  immer(
    persist(
      (set, get) => ({
        user: null,
        token: '',
        refreshToken: '',
        addUser: (payload) => set(payload),
        removeUser: () => set({ user: null, token: '', refreshToken: '' }),

        dispatch: (args) =>
          set((state) => {
            reducer(state, args);
          }),
      }),
      {
        name: 'auth',
      }
    )
  )
);

export default useAuthStore;
