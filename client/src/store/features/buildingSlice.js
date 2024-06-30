import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  building: null,
  balance:0,
  expenses: [],
  complaints: []

}

const buildingSlice = createSlice({
  name: "building",
  initialState: initialState,
  reducers: {
    currentBuilding: (state, actions) => {
      state.building = actions.payload.building;
    },
    logoutBuilding: (state, actions) => {
      state.building = null;
    },
    currentBalance: (state, actions) => {
      state.balance = actions.payload.balance;
    },
    updateBalance: (state, actions) => {
      state.balance = state.balance + actions.payload.balance;
    },
    saveComplaints: (state, actions) => {
      state.complaints = actions.payload.arr
    },
    saveExpenses: (state, actions) => {
      state.expenses = actions.payload.arr
    }
  }
})

export const { saveComplaints, currentBalance, logoutBuilding, updateBalance, currentBuilding, saveExpenses } = buildingSlice.actions;
export default buildingSlice.reducer;