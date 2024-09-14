import React from "react";
import "./todoForm.css";
import { useNavigate } from "react-router-dom";
import nowDate from "../../Helper/nowDate";
import createTask from "../../Helper/createTask";
import createRandomColor from "../../Helper/createRandomColor";
import updateHistory from "../../Helper/updateHistory";
const TodoForm = ({ state, dispatch }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  const addTask = async (e) => {
    e.preventDefault();
    const [taskSubject, task] = e.target;
    if (task.value.trim() === '' || taskSubject.value.trim() === '') {
      return;
    }
    const newTask = {
      id: new Date().getTime().toString(),
      task: task.value,
      title: taskSubject.value.trim() === "" ? null : taskSubject.value,
      isEdited: false,
      date: nowDate(),
      isDeleted: false,
      backgroundColor: createRandomColor(),
    };
    await createTask(newTask);
    dispatch({ type: "createTask", payload: newTask });
    const history = {
      id: newTask.id,
      title: 'added',
      taskTitle: newTask.title,
      date: newTask.date,
    }
    await updateHistory(history);
    navigate("/");
  };
  return (
    <div className="todoForm">
      <form onSubmit={addTask}>
        <div className="goBack">
          <i className="fa-solid fa-xmark" onClick={goBack}></i>
        </div>
        <div className="form_title">
          <h3>Create a Task</h3>
        </div>
        <label htmlFor="taskSubject">Task Subject</label>
        <input
          type="text"
          id="taskSubject"
          placeholder="Task Subject"
        />
        <label htmlFor="task" className="task">
          Task
        </label>
        <input type="text" id="task" placeholder="Task" />
        <button>Save</button>
      </form>
    </div>
  );
};

export default TodoForm;
