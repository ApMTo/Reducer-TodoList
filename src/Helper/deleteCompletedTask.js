const deleteCompletedTask = async(id) => {
    await fetch(`http://localhost:8080/completedTasks/${id}`, {
        method: 'DELETE'
    })
}

export default deleteCompletedTask;