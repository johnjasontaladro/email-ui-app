import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    value: {
      rawData: [],
      unRead: [],
      saved: [],
      deleted: [],
      checkedData: [],
      checkedSaveData: [],
    },
  },
  reducers: {
    setData: (state, action) => {
      state.value.rawData = action.payload;
      state.value.unRead = action.payload;
    },
    setCheckedData: (state, action) => {
      state.value.checkedData.push(action.payload);
    },
    removeCheckedData: (state, action) => {
      const newData = state.value.checkedData.filter((data) => {
        return data.Date !== action.payload.Date;
      });
      state.value.checkedData = newData;
    },
    clearCheckedData: (state, action) => {
      state.value.checkedData = [];
    },
    setCheckedSaveData: (state, action) => {
      state.value.checkedSaveData.push(action.payload);
    },
    removeCheckedSaveData: (state, action) => {
      const newData = state.value.checkedSaveData.filter((data) => {
        return data.Date !== action.payload.Date;
      });
      state.value.checkedData = newData;
    },
    clearCheckedSavedData: (state, action) => {
      state.value.checkedSaveData = [];
    },
    setSaved: (state, action) => {
      // remove from unread array
      // use date as primary key
      state.value.unRead = state.value.unRead.filter((msg, index) => {
        let payloadArr = [];

        action.payload.forEach((element) => {
          payloadArr.push(element.Date);
        });

        return !payloadArr.includes(msg.Date);
      });

      // pushed to saved array
      action.payload.forEach((element) => {
        state.value.saved.push(element);
      });
    },
    setDeleted: (state, action) => {
      // remove from unread array
      // use date as primary key
      state.value.unRead = state.value.unRead.filter((msg, index) => {
        let payloadArr = [];

        action.payload.unread.forEach((element) => {
          payloadArr.push(element.Date);
        });

        return !payloadArr.includes(msg.Date);
      });

      // remove from saved array
      // use date as primary key
      state.value.saved = state.value.saved.filter((msg, index) => {
        let payloadArr = [];

        action.payload.saved.forEach((element) => {
          payloadArr.push(element.Date);
        });

        return !payloadArr.includes(msg.Date);
      });

      const mergedArr = action.payload.unread.concat(action.payload.saved);

      // pushed to deleted array
      mergedArr.forEach((element) => {
        state.value.deleted.push(element);
      });
    },
  },
});

export const {
  setData,
  setCheckedData,
  removeCheckedData,
  clearCheckedData,
  setCheckedSaveData,
  removeCheckedSaveData,
  clearCheckedSavedData,
  setSaved,
  setDeleted,
} = emailSlice.actions;
export default emailSlice.reducer;
