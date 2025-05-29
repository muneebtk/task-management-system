import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { redirect } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  [key: string]: any; // Extendable for additional task fields
}

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/task/tasks");
      
      return response.data;
    } catch (error: any) {
      if(error.response?.status === 401) {
        redirect("/signin");
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks."
      );
      }
    }
  }
);

// Fetch a single task
export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/task/tasks/${id}/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch task."
      );
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Partial<Task>, { rejectWithValue }) => {
    try {
      // Transform `dueDate` to `due_date` before submission
      const transformedTask = {
        ...task,
        due_date: task.dueDate, // Rename the field
      };
      delete transformedTask.dueDate; // Remove the original `dueDate` field
      const response = await axiosInstance.post(
        "/api/task/tasks/",
        transformedTask
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task."
      );
    }
  }
);


// Update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    { id, task }: { id: string; task: Partial<Task> },
    { rejectWithValue }
  ) => {
    try {
      const { dueDate, ...rest } = task;
      const transformedTask = {
        ...rest,
        due_date: dueDate, // Map `dueDate` to `due_date`
      };
      delete transformedTask.dueDate; // Remove the original `dueDate` field
      const response = await axiosInstance.put(
        `/api/task/tasks/${id}/`,
        transformedTask
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task."
      );
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/task/tasks/${id}/`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task."
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tasks = payload;
      })
      .addCase(fetchTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedTask = payload;
      })
      .addCase(fetchTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.tasks.push(payload);
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        const index = state.tasks.findIndex((task) => task.id === payload.id);
        if (index !== -1) {
          state.tasks[index] = payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.filter((task) => task.id !== payload);
      });
  },
});

export default taskSlice.reducer;
