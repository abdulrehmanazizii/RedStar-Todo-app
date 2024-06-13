// HomePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import TodoList from '../../TodoApp/index.js';
import './style.scss';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  toggleTodoComplete,
  deleteTodo,
} from '../../todosSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    dispatch(addTodo(input));
    setInput('');
  };

  const handleEditTodo = (e) => {
    e.preventDefault();
    if (editInput === '') {
      alert('Please enter a valid todo');
      return;
    }
    dispatch(updateTodo({ id: editId, text: editInput }));
    setEditId(null);
    setEditInput('');
  };

  return (
    <div className='gradient-background'>
      <div className='main-container'>
        <h3 className='heading-main'> Todo App </h3>

        <form onSubmit={editId ? handleEditTodo : handleCreateTodo} className='form-container'>
          <input
            value={editId ? editInput : input}
            onChange={(e) => editId ? setEditInput(e.target.value) : setInput(e.target.value)}
            className='add-todos-input'
            type='text'
            placeholder={editId ? 'Edit Todo' : 'Add Todo'}
          />
          <button className='add-btn'><AiOutlinePlus size={30} /></button>
        </form>

        <ul className='ul-class'>
          {todos.map((todo, index) => (
            <TodoList
              key={index}
              todo={todo}
              toggleComplete={() => dispatch(toggleTodoComplete(todo.id))}
              deleteTodo={() => dispatch(deleteTodo(todo.id))}
              setEditId={setEditId}
              setEditInput={setEditInput}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : <p className='counter'>{`You have ${todos.length} todos`}</p>}
      </div>
    </div>
  );
};

export default HomePage;
