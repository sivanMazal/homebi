import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   imagesArr: [],
}

const userSlice = createSlice({
   name: "image",
   initialState: { value: initialState },
   reducers: {
      currentUser: (state, actions) => {
         state.user = "koko";
      },
      getUsers: (state, actions) => {
         state.usersList = actions.payload.users;
      },
      login:(state,action) => {
         state.user = action.payload.user;
       },
   }
})

export const { currentUser, getUsers, login } = userSlice.actions;
export default userSlice.reducer;