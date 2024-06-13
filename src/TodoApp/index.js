import React from 'react';

const TodoList = ({ todo, toggleComplete, deleteTodo, setEditId, setEditInput }) => {
  const handleEdit = () => {
    setEditId(todo.id);
    setEditInput(todo.text);
  };

  return (
    <li className='todo-item'>
      <div className='todo-content' onClick={() => toggleComplete(todo)}>
        <input type='checkbox' checked={todo.completed} readOnly />
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      </div>
      <div className='todo-actions'>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoList;
