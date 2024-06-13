import React from 'react';
import './style.scss';
import { FaRegTrashAlt } from 'react-icons/fa';

const TodoList = ({ todo, toggleComplete, deleteTodo, setEditId, setEditInput }) => {
  return (
    <li className={todo.completed ? 'list-items-completed' : 'list-items'}>
      <div className='row-div'>
        <input
          className='checkbox-cls'
          onChange={toggleComplete}
          type='checkbox'
          checked={todo.completed}
        />
        <p
          onClick={toggleComplete}
          className={todo.completed ? 'text-class-completed' : 'text-class'}
        >
          {todo.text}
        </p>
      </div>
      <div className='btns-div'>
        <button onClick={deleteTodo} className='dlt-btn'><FaRegTrashAlt /></button>
        <button onClick={() => { setEditId(todo.id); setEditInput(todo.text); }} className='edit-btn'>Edit</button>
      </div>
    </li>
  );
};

export default TodoList;
