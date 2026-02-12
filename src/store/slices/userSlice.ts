import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../types';

interface UserState {
  id: string | null;
  name: string | null;
  role: UserRole | null;
  email: string | null;
  phone: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  role: null,
  email: null,
  phone: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{
      id: string;
      name: string;
      role: UserRole;
      email: string;
      phone?: string;
    }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.phone = action.payload.phone || null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.role = null;
      state.email = null;
      state.phone = null;
      state.isAuthenticated = false;
    },
    updateUserRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, logout, updateUserRole } = userSlice.actions;
export default userSlice.reducer;
