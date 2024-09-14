const returnTask = async (id, postBody) => {
    await fetch(`http://localhost:8080/completedTasks/${id}`, {
        method: 'DELETE',
    })
    await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        body: JSON.stringify(postBody)
    })
}


export default returnTask;