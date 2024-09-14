import React, { useEffect } from "react";
import getCompletedTasks from "../../Helper/getCompletedTasks";
import deleteCompletedTask from "../../Helper/deleteCompletedTask";
import "./completedTasks.css";
import returnTask from "../../Helper/returnTask";
import nowDate from "../../Helper/nowDate";
import updateHistory from "../../Helper/updateHistory";

const CompletedTasks = ({ state, dispatch }) => {
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getCompletedTasks();
      dispatch({ type: "GetCompletedTasks", payload: tasks });
    };
    fetchData();
  }, [state?.completedTaskData]);
 
  const deleteTaskCompleted = (task) => {
    const history = {
      id: task.id,
      title: 'removed',
      taskTitle: task.title,
      date: nowDate()
    }
    updateHistory(history)
    dispatch({ type: "deleteCompletedTask", payload: task?.id });
    deleteCompletedTask(task?.id);
  }

  const returnedTask = (task) => {
    const history = {
      id: task.id,
      title: 'returned it back',
      taskTitle: task.title,
      date: nowDate()
    }
    updateHistory(history)
    dispatch({ type: "returnTask", payload: task.id });
    returnTask(task?.id, task);
  }
  return (
    <div className="completedTasks">
      {state?.completedTaskData?.map((task) => {
        return (
          <div
          className="sticky-note"
            style={{ backgroundColor: task?.backgroundColor }}
            key={task.id}
          >
            <div className="icons">
              <i
                className="fa-solid fa-check"
                onClick={() => {
                 returnedTask(task)
                }}
              ></i>
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  deleteTaskCompleted(task)
                }}
              ></i>
            </div>
            <div className="task_title">
              {!task?.title ? (
                <h3>Title: Unknown</h3>
              ) : (
                <h3>Title: {task?.title}</h3>
              )}
            </div>
            <div className="task_info">
              <h4>Task: {task?.task}</h4>
            </div>
         
          </div>
        );
      })}
    </div>
  );
};

export default CompletedTasks;
