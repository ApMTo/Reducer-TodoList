const getCompletedTasks = async () => {
    const request = await fetch('http://localhost:8080/completedTasks');
    const response = await request.json();
    return response;
}


export default getCompletedTasks;