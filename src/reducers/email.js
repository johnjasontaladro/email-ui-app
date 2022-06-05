import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../api/apiCall";

export const getEmailData = createAsyncThunk("email/getData", async () => {
  return await apiCall.getEmailData();
});

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    value: {
      rawData: [],
      unRead: [],
      unReadCurrentItems: [],
      currentPage: null,
      totalPage: null,
      saved: [],
      deleted: [],
      checkedData: [],
      checkedSaveData: [],
    },
    status: "idle",
  },
  reducers: {
    setData: (state, action) => {
      state.value.rawData = action.payload;
      state.value.unRead = action.payload;
      state.value.unReadCurrentItems = action.payload;
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
    setPaginate: (state, action) => {
      state.value.unReadCurrentItems = action.payload.currentItems;
      state.value.currentPage = action.payload.currentPage;
      state.value.totalPage = action.payload.totalPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmailData.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getEmailData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.value.rawData = action.payload;
      state.value.unRead = action.payload;
    });
    builder.addCase(getEmailData.rejected, (state, action) => {
      state.status = "failed";
    });
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
  setPaginate,
} = emailSlice.actions;
export default emailSlice.reducer;
