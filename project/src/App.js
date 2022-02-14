import React, { useState } from 'react';
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

  const [nfts, setNFTs] = useState(initialState.arts);
  const [cartItems, setCartItems] = useState(initialState.cartItems);
  const [category, setCategory] = useState("Arts");

  return (
    <Router>
      <Nav total={cartItems.length} />
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
