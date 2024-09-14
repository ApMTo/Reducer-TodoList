const getHistories = async () => {
    const request = await fetch('http://localhost:8080/history');
    const response = await request.json();
    return response;
}

export default getHistories