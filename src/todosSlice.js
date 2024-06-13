import { createSlice } from '@reduxjs/toolkit';
import { 
  collection, 
  query, 
  onSnapshot, 
  updateDoc, 
  doc, 
  addDoc, 
  deleteDoc, 
} from 'firebase/firestore';
import { db } from './firebase';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setTodos: (state, action) => action.payload,
    todoAdded: (state, action) => {
      state.push(action.payload);
    },
    todoUpdated: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.updates };
      }
    },
    todoDeleted: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setTodos, todoAdded, todoUpdated, todoDeleted } = todosSlice.actions;

export const fetchTodos = () => dispatch => {
  const q = query(collection(db, 'todos'));
  onSnapshot(q, (querySnapshot) => {
    let todosArr = [];
    querySnapshot.forEach((doc) => {
      todosArr.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setTodos(todosArr));
  });
};

export const addTodo = (text) => async dispatch => {
  const docRef = await addDoc(collection(db, 'todos'), {
    text,
    completed: false,
  });
  dispatch(todoAdded({ id: docRef.id, text, completed: false }));
};

export const updateTodo = ({ id, updates }) => async dispatch => {
  await updateDoc(doc(db, 'todos', id), updates);
  dispatch(todoUpdated({ id, updates }));
};

export const deleteTodo = (id) => async dispatch => {
  await deleteDoc(doc(db, 'todos', id));
  dispatch(todoDeleted(id));
};

export default todosSlice.reducer;
