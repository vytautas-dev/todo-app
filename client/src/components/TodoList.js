import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import { logout } from "../actions/auth";
import Todo from "./Todo";
import { getTodos } from "../actions/todo";
import Spinner from "./layouts/Spinner";

function TodoList() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return todos.loading ? (
    <Spinner />
  ) : (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm />
      {todos.todos.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
      <Link to='/login' onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </>
  );
}

export default TodoList;
