import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/User';
import { RootState } from './store';

export interface UsersState {
  list: User[],
  pickedUser?: User,
  searchText: string,
  ui_outdated: number;
}

const initialState: UsersState = {
  list: [],
  searchText: '',
  ui_outdated: Date.now(),
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setList: (state: UsersState, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    setSearchText: (state: UsersState, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    pickUser: (state: UsersState, action: PayloadAction<User>) => {
      state.pickedUser = action.payload;
    },
    sendOutdatedSignal: (state: UsersState, action: PayloadAction<number>) => {
      state.ui_outdated = action.payload;
    }
  }
})


export const { pickUser, setList, setSearchText, sendOutdatedSignal } =  usersSlice.actions;

export default usersSlice.reducer;

export const selectUserPicked = (state: RootState) => state.users.pickedUser;
export const selectUserList = (state: RootState) => state.users.list;
export const selectSearchText = (state: RootState) => state.users.searchText;
export const selectUIOutdated = (state: RootState) => state.users.ui_outdated;