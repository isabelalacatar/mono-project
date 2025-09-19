import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  email: string | null;
}

interface SetUserPayload {
  token: string;
  email: string;
}

const initialState: UserState = {
  token: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: SetUserPayload }) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
