import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, GET_TODOS, TODO_ERROR, UPDATE_TODO } from "../actions/types";

const initialState = {
  todos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
        loading: false,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
      };
    case UPDATE_TODO:

      return {
        ...state,
        todos: state.todos.map((todo) => todo._id === payload.id ? {...todo, text: payload.text} : todo ),
        loading: false,
      };

case COMPLETE_TODO:

return {
  ...state,
  todos: state.todos.map((todo) => todo._id === payload.id ? {...todo, isCompleted: !payload.isActive} : todo),
  loading: false,
}
    default:
      return state;
  }
}
