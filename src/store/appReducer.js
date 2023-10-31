import { createSlice } from "@reduxjs/toolkit";

// import CONFIG from "../config/config";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    uniqId: "uuid",
    selectedRows: [],
    tableAction: null,
    graphColumns: { category: null, values: [] },
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setTableAction: (state, action) => {
      state.tableAction = action.payload;
    },
    setGraphColumns: (state, action) => {
      state.graphColumns = action.payload;
    },
  },
});

export const { setSelectedRows, setTableAction, setGraphColumns } =
  appSlice.actions;

export default appSlice.reducer;
