const updateTask = async (id, taskBody) => {
  await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(taskBody),
  });
};


export default updateTask;