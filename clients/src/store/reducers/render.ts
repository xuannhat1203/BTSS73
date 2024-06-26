import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listJobs } from "../../interface";
import axios from "axios";

const listJob: listJobs[] = [];

// Lấy dữ liệu từ database
export const getJobs: any = createAsyncThunk("jobs/getAllJobs", async () => {
  const res = await axios.get("http://localhost:8080/listJobs");
  return res.data;
});

// Xóa jobs
export const deleteJob: any = createAsyncThunk(
  "jobs/deleteJobs",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/listJobs/${id}`);
    return id;
  }
);

// Thêm jobs
export const addJob: any = createAsyncThunk(
  "jobs/addJob",
  async (newJob: any) => {
    const res = await axios.post("http://localhost:8080/listJobs", newJob);
    return res.data;
  }
);

// Sửa Job
export const editJob: any = createAsyncThunk(
  "jobs/editJob",
  async ({
    id,
    nameJob,
    status,
  }: {
    id: number;
    nameJob: string;
    status: boolean;
  }) => {
    const res = await axios.put(`http://localhost:8080/listJobs/${id}`, {
      nameJob,
      status,
    });
    return res.data;
  }
);
// Sửa trạng thái của Job
export const updateJobStatus: any = createAsyncThunk(
  "jobs/updateJobStatus",
  async ({
    id,
    nameJob,
    status,
  }: {
    id: number;
    nameJob: string;
    status: boolean;
  }) => {
    const res = await axios.put(`http://localhost:8080/listJobs/${id}`, {
      nameJob,
      status,
    });
    return res.data;
  }
);
const jobReducers = createSlice({
  name: "listJobs",
  initialState: {
    jobs: listJob,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((item) => item.id !== action.payload);
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(editJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.jobs[index] = {
            ...state.jobs[index],
            nameJob: action.payload.nameJob,
          };
        }
      })
      .addCase(updateJobStatus.fulfilled, (state: any, action: any) => {
        const index = state.jobs.findIndex(
          (item: any) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.jobs[index] = {
            ...state.jobs[index],
            status: action.payload.status,
          };
        }
      });
  },
});
export default jobReducers.reducer;
