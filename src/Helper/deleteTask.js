const deleteTask = async(id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'DELETE',
    })
}


export default deleteTask;