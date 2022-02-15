import React, { useState } from 'react';
import NFT from '../components/NFT';
import ITEM from '../components/Item'
import { initialState } from '../assets/state';


function NFTListContainer({ nfts, myNFTs, setNFTs, setMyNFTs }) {
  const [join, setJoin] = useState(false);
  const [category, setCategory] = useState("Arts");
  const categories = ["Arts", "Collectibles", "Domain Names", "Music", "Photography", "Sports", "Trading Cards", "Utility", "Virtual Worlds"];
  const clickCategory = (e) => {
    const category = e.currentTarget.innerText;
    setCategory(category);
    setNFTs(initialState[category.toLowerCase()]);
    setJoin(false);
  }
  const handleJoin = (e, name) => {
    const nft = name.replace(/ /g, "");
    setCategory(name);
    setNFTs(initialState[nft]);
    setJoin(true);
  }
  const handleBuy = (e, id) => {
    const cartIdList = []
    let tempCart = myNFTs.slice()

    for (const el of myNFTs) {
      cartIdList.push(el.itemId)
    }

    if (cartIdList.includes(id)) {
      for (const el of tempCart) {
        if (el.itemId === id) {
          el.quantity++
        }
      }
      setMyNFTs(tempCart)
    } else {
      const newItem = {
        "itemId": id,
        "quantity": 1
      }
      tempCart.push(newItem)
      setMyNFTs(tempCart)
    }

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
          ? nfts.map((item, idx) => <NFT item={item} key={idx} join={join} handleJoin={handleJoin} />)
          : nfts.map((item, idx) => <ITEM item={item} key={idx} join={join} handleBuy={handleBuy} />)}
      </div>
    </div>
  );
}

export default NFTListContainer;
