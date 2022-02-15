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
import YourNFT from './pages/YourNFT';
import { initialState } from './assets/state';

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');
  const [nfts, setNFTs] = useState(initialState.arts);
  const [cartItems, setCartItems] = useState(initialState.cartItems);
  const [category, setCategory] = useState("Arts");
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
      <Nav total={cartItems.length} account={account} setAccount={setAccount} />
      <Switch>
        <Route exact={true} path="/">
          <NFTList category={category} nfts={nfts} cartItems={cartItems} setCategory={setCategory} setNFTs={setNFTs} setCartItems={setCartItems} />
        </Route>
        <Route path="/yourNFT">
          <YourNFT cartItems={cartItems} setCartItems={setCartItems} nfts={nfts} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
