import axios from "axios";
import { setAlert } from "./alert";
import {
    ADD_TODO,
    DELETE_TODO,
    GET_TODOS,
    TODO_ERROR,
    UPDATE_TODO,
    COMPLETE_TODO
  } from "./types";

  //Get todos

export const getTodos = () => async (dispatch) => {
    try {
      const res = await axios.get("/api/todos");
  
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: TODO_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

  export const addTodo = (formData) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const res = await axios.post("/api/todos", formData, config);
  
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
  
      dispatch(setAlert("Todo Created", "success"));
    } catch (error) {
      dispatch({
        type: TODO_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

  export const deleteTodo = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/todos/${id}`);
  
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
  
      dispatch(setAlert("Todo Removed", "success"));
      
    } catch (error) {

      dispatch({
        type: TODO_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

  export const updateTodo = (id, text) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
        await axios.put(`/api/todos/${id}`, { id, text }, config);
  
      dispatch({
        type: UPDATE_TODO,
        payload: { id, text },
      });

    } catch (error) {
      dispatch({
        type: TODO_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

  export const completeTodo = (id, isActive) => async (dispatch) => {
    try {
      await axios.put(`/api/todos/complete/${id}`,);
  
      dispatch({
        type: COMPLETE_TODO,
        payload: { id, isActive },
      });
      
    } catch (error) {

      dispatch({
        type: TODO_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };