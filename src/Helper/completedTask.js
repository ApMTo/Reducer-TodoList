const completedTask = async (id, postBody) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'DELETE',
    })
    await fetch('http://localhost:8080/completedTasks', {
        method: 'POST',
        body: JSON.stringify(postBody)
    })
}


export default completedTask;