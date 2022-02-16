import React, { useState } from 'react';
import NFT from '../components/NFT';
import ITEM from '../components/Item'
import { initialState } from '../assets/state';


function NFTListContainer({ nfts, myNFTs, setNFTs, setMyNFTs, renewNFTList }) {
  const [join, setJoin] = useState(false);
  const [category, setCategory] = useState("Arts");
  const categories = ["Arts", "Collectibles", "Domain Names", "Music", "Photography", "Sports", "Trading Cards", "Utility", "Virtual Worlds"];
  const clickCategory = (e) => {
    const category = e.currentTarget.innerText;
    setCategory(category);
    setNFTs(initialState[category.toLowerCase()]);
    setJoin(false);
  }
  const handleJoin = (e, name, id) => {
    const nft = name.replace(/ /g, "");
    setCategory(name);
    setNFTs([]);
    renewNFTList(id);
    setJoin(true);
  }
  const handleBuy = (e, item) => {
    const nextIdx = myNFTs[myNFTs.length - 1]["idx"] + 1;
    const newNFT = {
      "idx": nextIdx,
      "category": item.category,
      "nft": item.nft,
      "name": item.name,
      "img": item.img,
      "itemId": item.id,
      "price": item.price
    }

    setMyNFTs([...myNFTs, newNFT]);
  }
  return (
    <div id="item-list-container">
      <div id="nft-List">
        <ul className='nfts'>
          {categories.map((category, idx) => {
            return (<li className='nft' id={idx} key={idx} onClick={(e) => clickCategory(e)}> {category}</li>);
          })}
        </ul>
      </div>
      <div id="item-list-body">
        <div id="item-list-title">{category}</div>
        {join === false
          ? nfts.map((item, idx) => <NFT item={item} key={idx} handleJoin={handleJoin} />)
          : nfts.map((item, idx) => <ITEM item={item} key={idx} handleBuy={handleBuy} />)}
      </div>
    </div>
  );
}

export default NFTListContainer;
