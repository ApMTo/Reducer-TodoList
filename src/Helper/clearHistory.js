const clearHistory = async () => {
  const response = await fetch("http://localhost:8080/history");
  const history = await response.json();

  for (const item of history) {
    await fetch(`http://localhost:8080/history/${item.id}`, {
      method: "DELETE",
    });
  }
};

export default clearHistory;
