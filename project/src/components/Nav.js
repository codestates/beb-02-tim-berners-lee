import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ total }) {

  return (
    <div id="nav-body">
      <span id="title">
        <img id="logo" src="../logo.png" alt="logo" />
        <span id="name">CodeSea</span>
      </span>
      <div id="menu">
        Explore Token
        <Link to="/">Explore NFT</Link>
        <Link to="/yourNFT">
          NFT 목록<span id="nav-item-counter">{total}</span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
