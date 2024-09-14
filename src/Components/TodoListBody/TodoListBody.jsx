import { useEffect } from "react";
import getTasks from "../../Helper/getTasks";
import { Outlet } from "react-router-dom";
import TodItem from "../TodoItem/TodItem";
import "./todoListBody.css";

const TodoListBody = ({ state, dispatch }) => {
  useEffect(() => {
    const fetchData = async () => {
      const getTask = await getTasks();
      dispatch({ type: "getAllTasks", payload: getTask });
    };
    fetchData();
  }, []);
  return (
    <>
      <Outlet />
     {state?.tasksData[1]?.id ?  <div className="options">
        <button onClick={() => dispatch({type: 'RandomMove'})}>Randomly move tasks</button>
        <button onClick={() => dispatch({type: 'DateMove'})}>Move tasks by date</button>
      </div> : ''}
      <div className="todoListBody">
        {state?.tasksData?.map(task => {
          return <TodItem task={task} dispatch={dispatch} key={task.id} />
     })}
      </div>
    </>
  );
};

export default TodoListBody;
