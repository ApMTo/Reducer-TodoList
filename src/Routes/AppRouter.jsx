import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import TodoListBody from "../Components/TodoListBody/TodoListBody";
import TodoForm from "../Components/TodoForm/TodoForm";
import getTasks from "../Helper/getTasks";
import CompletedTasks from "../Pages/CompletedTasks/CompletedTasks";
import HistoryPage from "../Pages/HistoryPage/HistoryPage";
import CloseHistory from "../Components/ClearHistory/CloseHistory";
const AppRouter = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "getAllTasks":
        return {
          ...state,
          tasksData: action.payload,
        };
      case "createTask":
        return {
          ...state,
          tasksData: [...state.tasksData, action.payload],
        };
      case "deleteAnimation":
        return {
          ...state,
          taskData: [
            ...state.tasksData.map((task) => {
              if (task.id === action.payload) {
                task.isDeleted = true;
              }
              return task;
            }),
          ],
        };

      case "deleteTask":
        return {
          ...state,
          tasksData: [
            ...state.tasksData.filter((task) => task.id !== action.payload),
          ],
        };
      case "completedTask":
        return {
          ...state,
          tasksData: [
            ...state.tasksData.filter((task) => task.id !== action.payload),
          ],
        };
      case "GetCompletedTasks":
        return {
          ...state,
          completedTaskData: action.payload,
        };
      case "deleteCompletedTask":
        return {
          ...state,
          completedTaskData: [
            ...state.completedTaskData.filter(
              (task) => task.id !== action.payload
            ),
          ],
        };
      case "returnTask":
        return {
          ...state,
          completedTaskData: [
            ...state.completedTaskData.filter(
              (task) => task.id !== action.payload
            ),
          ],
        };
      case "editTask":
        return {
          ...state,
          tasksData: [
            ...state.tasksData.map((task) => {
              if (task.id === action.payload) {
                task.isEdited = true;
              }
              return task;
            }),
          ],
        };

      case "editedTask":
        return {
          ...state,
          tasksData: state.tasksData.map((task) =>
            task.id === action.payload.id
              ? { ...task, ...action.payload.updatedTask, isEdited: false }
              : task
          ),
        };

      case "cancleEdit":
        return {
          ...state,
          tasksData: [
            ...state.tasksData.map((task) => {
              if (task.id === action.payload) {
                task.isEdited = false;
              }
              return task;
            }),
          ],
        };
      case "RandomMove":
        return {
          ...state,
          tasksData: [...state.tasksData.sort(() => Math.random() - 0.5)],
        };
      case "DateMove":
        return {
          ...state,
          tasksData: [...state.tasksData.sort((a, b) => a.id - b.id)],
        };
      case "changeColor":
        return {
          ...state,
          tasksData: [
            ...state.tasksData.map((task) => {
              if (task.id === action.payload.id) {
                task.backgroundColor = action.payload.color;
              }
              return task;
            }),
          ],
        };
      case "GetHistory":
        return {
          ...state,
          history: action.payload
        }
      case "ClearHistory": 
        return {
          ...state,
          history: []
        }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    tasksData: [],
    completedTaskData: [],
    history: []
  });
  useEffect(() => {
    const fetchData = async () => {
      const getTask = await getTasks();
      dispatch({ type: "getAllTasks", payload: getTask });
    };
    fetchData();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={<TodoListBody state={state} dispatch={dispatch} />}
        >
          <Route
            path="add"
            element={<TodoForm state={state} dispatch={dispatch} />}
          />
        </Route>
        <Route
          path="completed-tasks"
          element={<CompletedTasks state={state} dispatch={dispatch} />}
        />
      </Route>
      <Route path="history" element={<HistoryPage state={state} dispatch={dispatch} />} >
        <Route path="clear" element={<CloseHistory state={state} dispatch={dispatch} />} />
      </Route>
      <Route
        path="*"
        element={<h1 style={{ textAlign: "center" }}>Not founded 404</h1>}
      />
    </Routes>
  );
};

export default AppRouter;
