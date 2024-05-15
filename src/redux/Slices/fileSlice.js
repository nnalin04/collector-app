import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "uploadedFiles",
  initialState: {
    files: [],
    uploadStatus: "",
  },
  reducers: {
    addFile(state, action) {
      state.files.push(action.payload);
    },
    setUploadStatus(state, action) {
      state.uploadStatus = action.payload;
    },
  },
});

export const { addFile, setUploadStatus } = fileSlice.actions;

export default fileSlice.reducer;
