import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
            <span className="logo-emoji">✈️</span> WhereToGo
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a 
                href="https://github.com/yejinj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link github-link"
              >
                goto <b>GitHub/yejinj</b>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;