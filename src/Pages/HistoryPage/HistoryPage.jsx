import React, { useEffect } from "react";
import getHistories from "../../Helper/getHistories";
import "./historyPage.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
const HistoryPage = ({ state, dispatch }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const historyData = await getHistories();
      dispatch({ type: "GetHistory", payload: historyData });
    };
    fetchData();
  }, []);
  const goBack = () => {
      navigate('/')
  }
  return (
    <>
      <Outlet />
      <div className="history">
        <div className="go_back">
          <i className="fa-solid fa-arrow-left" onClick={goBack}></i>
          <Link to="clear">
            <i className="fa-solid fa-broom"></i>
          </Link>
        </div>
        <div className="history_body">
          {state?.history.length === 0 ? (
            <div>No history available.</div>
          ) : (
            state.history.map((history) => (
              <div key={history.id} className="history_container">
                {history.title !== "returned it back" ? (
                  <>
                    <h4>
                      You have {history.title} a task called {history.taskTitle}
                    </h4>
                    <span>{history.date}</span>
                  </>
                ) : (
                  <>
                    <h4>
                      You returned back a task with the name {history.taskTitle}
                    </h4>
                    <span>{history.date}</span>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
