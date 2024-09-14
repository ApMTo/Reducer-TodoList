import React from "react";
import deleteTask from "../../Helper/deleteTask";
import "./todoItem.css";
import completedTask from "../../Helper/completedTask";
import updateTask from "../../Helper/updateTask";
import nowDate from "../../Helper/nowDate";
import updateHistory from "../../Helper/updateHistory";

const TodItem = ({ task, dispatch }) => {
  const submitChanges = (e) => {
    e.preventDefault();
    const [subject, taskInput] = e.target.elements;

    if (taskInput.value.trim() === "") {
      return;
    }

    const editedTask = {
      id: task.id,
      updatedTask: {
        title: subject.value,
        task: taskInput.value,
      },
    };

    const history = {
      id: task.id,
      title: 'modified',
      taskTitle: task.title,
      date: nowDate(),
    }

    updateHistory(history)

    dispatch({ type: "editedTask", payload: editedTask });
  };

  const changeColor = (e) => {
    const newColoredBox = {
      backgroundColor: e.target.value,
    };
    updateTask(task.id, newColoredBox);
    dispatch({
      type: "changeColor",
      payload: {
        id: task.id,
        color: e.target.value,
      },
    });
  };

  const deletedTask = () => {
    dispatch({ type: "deleteAnimation", payload: task.id });
    const deletedHistory = {
      id: task?.id,
      title: 'removed',
      taskTitle: task.title,
      date: nowDate()
    }
    updateHistory(deletedHistory);
    setTimeout(() => {
      dispatch({ type: "deleteTask", payload: task?.id });
      deleteTask(task?.id);
    }, 1300);
  };
  const checked = () => {
    const history = {
      id: task.id,
      title: 'completed',
      taskTitle: task.title,
      date: nowDate()
    }
    updateHistory(history)
    dispatch({ type: "completedTask", payload: task?.id });
    completedTask(task?.id, task);
  }
  return (
    <>
      <div
        className={`sticky-note ${task?.isDeleted ? "deletedTask" : ""}`}
        style={{ backgroundColor: task?.backgroundColor }}
      >
        {!task?.isEdited ? (
          <div className="icons_and_colors">
            <div className="change_color">
              <label htmlFor={`color-${task.id}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3963/3963860.png"
                  alt="rgb"
                />
              </label>
              <input
                type="color"
                id={`color-${task.id}`}
                onChange={changeColor}
              />
            </div>
            <div className="icons">
              <i
                className="fa-solid fa-check"
                onClick={() => {
                 checked()
                }}
              ></i>
              <i
                className="fa-solid fa-pen"
                onClick={() => {
                  dispatch({ type: "editTask", payload: task?.id });
                  const editObject = {
                    isEdited: true,
                  };
                  updateTask(task.id, editObject);
                }}
              ></i>
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  deletedTask();
                }}
              ></i>
            </div>
          </div>
        ) : (
          <div className="icons">
            <i
              className="fa-solid fa-xmark cancel"
              onClick={() => {
                const editedTask = {
                  isEdited: false,
                };
                dispatch({ type: "cancleEdit", payload: task?.id });
                updateTask(task.id, editedTask);
              }}
            ></i>
          </div>
        )}
        {!task?.isEdited ? (
          <div className="todoItem">
            <div className="task_title">
              {task?.title ? (
                <h3>Title: {task.title}</h3>
              ) : (
                <h3>Title: Unknown</h3>
              )}
            </div>
            <div className="task_info">
              <h4>Task: {task?.task}</h4>
            </div>
            <div className="task_footer">
              <span>Task created on {task?.date}</span>
            </div>
          </div>
        ) : (
          <form className="todoItemForm" onSubmit={submitChanges}>
            <input type="text" defaultValue={task?.title} /> <br />
            <input type="text" className="taskEdit" defaultValue={task?.task} />
            <button>Save</button>
          </form>
        )}
      </div>
    </>
  );
};

export default TodItem;
