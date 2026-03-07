import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  user: any;
  authToken: any;


}
export const initialState: AuthState = {
  user: {},
  authToken: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  
    setAuthData: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    setAuthToken: (state, { payload }: PayloadAction<any>) => {
      state.authToken = payload;
    },
  },
});

export const {setAuthData,setAuthToken} = authSlice.actions;
export default authSlice.reducer;
export const getToken = (state: RootState) => state?.auth.authToken;
export const getAuthData = (state: RootState) => state?.auth.user;


