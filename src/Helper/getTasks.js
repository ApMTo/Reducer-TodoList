const getTasks = async() => {
    const request = await fetch('http://localhost:8080/tasks');
    const result = await request.json();
    return result;
}


export default getTasks;