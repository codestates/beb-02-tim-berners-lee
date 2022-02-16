import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Nav from './components/Nav';
import NFTList from './pages/NFTList';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyNFT from './pages/MyNFT';
import { initialState } from './assets/state';
import { fidenzaAbi, fidenzaAddr } from './fidenzaContract';
import { sealenzaAbi, sealenzaAddr } from './sealenzaContract';

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');
  const [nfts, setNFTs] = useState(initialState.arts);
  const [myNFTs, setMyNFTs] = useState([]);
  const [token, setToken] = useState({
    name: undefined,
    symbol: undefined,
    balance: undefined,
  });

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const renewMyNFTList = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const contracts = [
      [fidenzaAbi, fidenzaAddr],
      [sealenzaAbi, sealenzaAddr],
    ];
    for (const [abi, address] of contracts) {
      const contract = new web3.eth.Contract(abi, address);
      const name = await contract.methods.name().call();
      const totalSupply = await contract.methods.totalSupply().call();

      for (let tokenId = 1; tokenId <= totalSupply; tokenId++) {
        const tokenOwner = await contract.methods.ownerOf(tokenId).call();
        if (tokenOwner === accounts[0]) {
          const tokenPrice = await contract.methods.tokenPrice(tokenId).call();
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          setMyNFTs((prevState) => {
            return [
              ...prevState,
              { contract, name, tokenPrice, tokenId, tokenURI },
            ];
          });
        }
      }
    }
  };

  return (
    <Router>
      <Nav
        total={myNFTs.length}
        web3={web3}
        account={account}
        setAccount={setAccount}
        token={token}
        setToken={setToken}
        renewMyNFTList={renewMyNFTList}
      />
      <Switch>
        <Route exact={true} path="/">
          <NFTList
            nfts={nfts}
            myNFTs={myNFTs}
            setNFTs={setNFTs}
            setMyNFTs={setMyNFTs}
          />
        </Route>
        <Route path="/myNFT">
          <MyNFT
            myNFTs={myNFTs}
            setMyNFTs={setMyNFTs}
            nfts={nfts}
            account={account}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
