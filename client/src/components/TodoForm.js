import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../actions/todo";

function TodoForm({ edit }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleUpdateTodo = (e) => {
    dispatch(updateTodo(edit.id, input));
    edit.id = null;
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      dispatch(
        addTodo({
          text: input,
        })
      );
    }
    setInput("");
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      {edit ? (
        <>
          <div className='form-group-todo'>
            <input
              placeholder='Update your item'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name='text'
              ref={inputRef}
              className='todo-input edit'
            />
            <button onClick={handleUpdateTodo} className='todo-button edit'>
              Update
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='form-group-todo'>
            <input
              placeholder='Add a todo'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name='text'
              className='todo-input'
              ref={inputRef}
            />
            <button onClick={handleSubmit} className='todo-button'>
              Add todo
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default TodoForm;
