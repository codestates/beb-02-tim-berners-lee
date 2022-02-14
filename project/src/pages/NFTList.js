import React from 'react';
import NFT from '../components/NFT';
import { initialState } from '../assets/state';


function NFTListContainer({ category, nfts, cartItems, setCategory, setNFTs, setCartItems }) {
  const categories = ["Arts", "Collectibles", "Domain Names", "Music", "Photography", "Sports", "Trading Cards", "Utility", "Virtual Worlds"];
  const clickCategory = (e) => {
    const category = e.currentTarget.innerText;
    setCategory(category);
    setNFTs(initialState[category.toLowerCase()]);
  }
  const handleClick = (e, id) => {
    const cartIdList = []
    let tempCart = cartItems.slice()

    for (const el of cartItems) {
      cartIdList.push(el.itemId)
    }

    if (cartIdList.includes(id)) {
      for (const el of tempCart) {
        if (el.itemId === id) {
          el.quantity++
        }
      }
      setCartItems(tempCart)
    } else {
      const newItem = {
        "itemId": id,
        "quantity": 1
      }
      tempCart.push(newItem)
      setCartItems(tempCart)
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
        {nfts.map((item, idx) => <NFT item={item} key={idx} handleClick={handleClick} />)}
      </div>
    </div>
  );
}

export default NFTListContainer;
