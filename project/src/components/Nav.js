import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ total, account, setAccount }) {
  const connectWallet = async () => {
    console.log(account);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    console.log(accounts[0])
    setAccount(accounts[0]);
  };

  return (
    <div id="nav-body">
      <span id="title">
        <img id="logo" src="../logo.png" alt="logo" />
        <span id="name">CodeSea</span>
      </span>
      <span id="login">
        {account !== undefined && account !== ''
          ? <span>Your Address : {account}</span>
          : <button className="connect-button" onClick={() => connectWallet()}>
            connect to MetaMask
          </button>}
      </span>
      <div id="menu">
        <Link to="/token">Login</Link>
        <Link to="/">Explore NFT</Link>
        <Link to="/yourNFT">
          NFT 목록<span id="nav-item-counter">{total}</span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
