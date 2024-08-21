import React from "react";
import styled from "styled-components";

function Header() {
  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle("active");
  };
  return (
    <Area>
      <h1>BDRILL</h1>
      <HamburgerMenu>
        <div className="hamburger-menu animate-color-change" onClick={toggle}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <ul className="menu">
          <li>
            <a href="#">メニュー1</a>
          </li>
          <li>
            <a href="#">メニュー2</a>
          </li>
          <li>
            <a href="#">メニュー3</a>
          </li>
          <li>
            <a href="#">メニュー4</a>
          </li>
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
