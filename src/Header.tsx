import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import config from "./config";

function Header() {
  const hamburger = useRef<HTMLDivElement>(null);
  const toggle = () => {
    if (hamburger.current === null) return;
    hamburger.current.classList.toggle("active");
  };
  const handleGoto = (path: string) => () => {
    toggle();
    window.location.href = path;
  };
  return (
    <Area>
      <Link to="/">
        <h1>BDRILL</h1>
      </Link>
      <HamburgerMenu>
        <div
          ref={hamburger}
          className="hamburger-menu animate-color-change"
          onClick={toggle}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <ul className="menu">
          <li onClick={handleGoto(`/${config.basenamee}`)}>top</li>
          <li onClick={handleGoto(`/${config.basenamee}/results`)}>成績</li>
        </ul>
      </HamburgerMenu>
    </Area>
  );
}

export default Header;

const Area = styled.header`
  display: flex;
  background-color: #f0f0f0;
  padding: 1rem;
  h1 {
    margin: 0;
  }
    56px;
`;

const HamburgerMenu = styled.div`
  margin-left: auto;
  /* ハンバーガーメニューのスタイル */
  .hamburger-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 2rem;
    cursor: pointer;
    transition: transform 0.3s;
  }

  /* ハンバーガーメニューのアイコンのスタイル */
  .hamburger-line {
    width: 100%;
    height: 2px;
    background-color: #333;
    margin-bottom: 4px;
    transition: background-color 0.3s;
  }

  /* activeクラスのスタイル */
  .active .hamburger-line:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .active .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .active .hamburger-line:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  /* メニューのスタイル */
  .menu {
    display: none;
    background-color: #f0f0f0;
    padding: 10px;
  }

  ul {
    list-style: none;
  }

  /* activeクラスが付与されたときのメニューのスタイル */
  .active + .menu {
    display: block;
  }
`;
