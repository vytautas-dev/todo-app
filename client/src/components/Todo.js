import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { completeTodo, deleteTodo } from "../actions/todo";
import TodoForm from "./TodoForm";

const Todo = ({ todo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [isActive, setIsActive] = useState(todo.isCompleted);

  const dispatch = useDispatch();

  const submitUpdate = (value) => {
    setEdit({
      id: "",
      value: "",
    });
  };

  const toggleClass = () => {
    dispatch(completeTodo(todo._id, isActive));
    setIsActive(!isActive);
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div className='todo-row'>
      <div
        className={isActive ? "completed" : null}
        onClick={toggleClass}
        style={{ cursor: "pointer" }}>
        {todo.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          className='delete-icon'
          onClick={() => dispatch(deleteTodo(todo._id))}
        />
        <TiEdit
          className='edit-icon'
          onClick={() => setEdit({ id: todo._id, value: todo.text })}
        />
      </div>
    </div>
  );
};

export default Todo;
