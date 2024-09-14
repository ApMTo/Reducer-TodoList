const updateHistory = async (postBody) => {
  await fetch("http://localhost:8080/history", {
    method: "POST",

    body: JSON.stringify(postBody),
  });
};

export default updateHistory;
