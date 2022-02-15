import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Nav from './components/Nav';
import NFTList from './pages/NFTList';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MyNFT from './pages/MyNFT';
import { initialState } from './assets/state';

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');
  const [nfts, setNFTs] = useState(initialState.arts);
  const [myNFTs, setMyNFTs] = useState(initialState.cartItems);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <Router>
      <Nav total={myNFTs.length} account={account} setAccount={setAccount} />
      <Switch>
        <Route exact={true} path="/">
          <NFTList nfts={nfts} myNFTs={myNFTs} setNFTs={setNFTs} setMyNFTs={setMyNFTs} />
        </Route>
        <Route path="/yourNFT">
          <MyNFT myNFTs={myNFTs} setMyNFTs={setMyNFTs} nfts={nfts} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
