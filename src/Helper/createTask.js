const createTask = async(task) => {
    await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        body: JSON.stringify(task)
    });
}






export default createTask;