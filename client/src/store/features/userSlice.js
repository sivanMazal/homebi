import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   user: null,
   usersList: [],
}

const userSlice = createSlice({
   name: "user",
   initialState:  initialState ,
   reducers: {
      currentUser: (state, actions) => {
         state.user = actions.payload.user;
      },
      logoutUser: (state, actions) => {
         state.user = null;
       },
      getUsers: (state, actions) => {
         state.usersList = actions.payload.users;
      },
      login:(state,action) => {
         state.user = action.payload.user;
       },
   }
})

export const { currentUser, getUsers, login, logoutUser } = userSlice.actions;
export default userSlice.reducer;