import { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { erc20Abi, erc20Addr } from '../erc20Contract';
import { Modal } from '@mui/material';

function Nav({ total, web3, account, setAccount, token, setToken }) {
  const [open, setOpen] = useState(false);

  const connectWallet = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(erc20Abi, erc20Addr);
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      const balance = await contract.methods.balanceOf(accounts[0]).call();
      setAccount(accounts[0]);
      setToken({
        name: name,
        symbol: symbol,
        balance: web3.utils.fromWei(balance, 'ether'),
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="nav-body">
      <span id="title">
        <img id="logo" src="../logo.png" alt="logo" />
        <span id="name">CodeSea</span>
      </span>
      <div id="menu">
        <Link onClick={connectWallet}>Login</Link>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Login
            web3={web3}
            account={account}
            setAccount={setAccount}
            token={token}
            setToken={setToken}
            connectWallet={connectWallet}
          />
        </Modal>
        <Link to="/">Explore NFT</Link>
        <Link to="/myNFT">
          NFT 목록<span id="nav-item-counter">{total}</span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
