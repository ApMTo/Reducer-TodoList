import React from "react";
import "./closeHistory.css";
import { useNavigate } from "react-router-dom";
import clearHistory from "../../Helper/clearHistory";

const CloseHistory = ({state, dispatch}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/history')
    }

    const clear = async() => {
        await clearHistory();
        dispatch({ type: 'ClearHistory' })
        navigate('/history')
    }
  return (
    <div className="clear">
      <div className="clear_body">
        <h4>Are you sure you want to clear your history?</h4>
        <div className="buttons">
          {" "}
          <button onClick={clear}>Yes</button>
          <button onClick={goBack}>Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default CloseHistory;
