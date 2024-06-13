import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from './firebase';

// Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const q = query(collection(db, 'todos'));
  const querySnapshot = await new Promise((resolve) => {
    const unsubscribe = onSnapshot(q, resolve);
    return () => unsubscribe();
  });
  let todosArr = [];
  querySnapshot.forEach((doc) => {
    todosArr.push({ ...doc.data(), id: doc.id });
  });
  return todosArr;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const docRef = await addDoc(collection(db, 'todos'), {
    text,
    completed: false,
  });
  return { id: docRef.id, text, completed: false };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, text }) => {
  await updateDoc(doc(db, 'todos', id), { text });
  return { id, text };
});

export const toggleTodoComplete = createAsyncThunk('todos/toggleTodoComplete', async (id, { rejectWithValue }) => {
  try {
    const docRef = doc(db, 'todos', id);
    const docSnap = await getDoc(docRef);
    const currentStatus = docSnap.data().completed;
    await updateDoc(docRef, { completed: !currentStatus });
    return { id, completed: !currentStatus };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await deleteDoc(doc(db, 'todos', id));
  return id;
});

// Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Optimistic update for toggleTodoComplete
    toggleCompleteOptimistic: (state, action) => {
      const { id } = action.payload;
      const existingTodo = state.items.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },
    // Revert the optimistic update in case of failure
    revertToggleComplete: (state, action) => {
      const { id } = action.payload;
      const existingTodo = state.items.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, text } = action.payload;
        const existingTodo = state.items.find(todo => todo.id === id);
        if (existingTodo) {
          existingTodo.text = text;
        }
      })
      .addCase(toggleTodoComplete.fulfilled, (state, action) => {
        const { id, completed } = action.payload;
        const existingTodo = state.items.find(todo => todo.id === id);
        if (existingTodo) {
          existingTodo.completed = completed;
        }
      })
      .addCase(toggleTodoComplete.rejected, (state, action) => {
        const { id } = action.meta.arg;
        const existingTodo = state.items.find(todo => todo.id === id);
        if (existingTodo) {
          existingTodo.completed = !existingTodo.completed;  
        }
        state.error = action.error.message;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      });
  },
});

export const { toggleCompleteOptimistic, revertToggleComplete } = todosSlice.actions;
export default todosSlice.reducer;
