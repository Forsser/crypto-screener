import React from "react";
import "../styles/header.scss";
const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <span className="header__logo--blue">CRYPTO</span>
        <span className="header__logo--gray">ANAL</span>
      </div>
      <nav className="header__nav">
        <ul className="header__menu">
          <li>Платформа</li>
          <li>Університет</li>
          <li>Спільнота</li>
          <li>Стрічка</li>
          <li>Тарифи</li>
        </ul>
      </nav>
      <div className="header__actions">
        <button className="header__login-btn">Вхід</button>
        <span>UA</span>
        <div className="header__notifications">
          <i className="bell-icon"></i> {/* Іконка дзвоника */}
          <span className="header__notifications-count">7</span>
        </div>
        <i className="theme-toggle-icon"></i> {/* Іконка перемикача теми */}
      </div>
    </header>
  );
};

export default Header;
