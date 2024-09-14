import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'

const Header = () => {
    return (
        <header>
            <div className='logo'>
                <Link to='/'>
                    <img src="https://taskify.co/wp-content/uploads/2023/01/Taskify_1.png" alt="logo" />
                </Link>
            </div>
            <div className='navigation'>
                <Link to='/'>Tasks</Link>
                <Link to='/completed-tasks'>Completed tasks</Link>
                <Link to='add'>Add Task</Link>
                <Link to='/history' className='historyIcon'><i className="fa-solid fa-clock-rotate-left"></i></Link>
            </div>
        </header>
    );
}

export default Header;
