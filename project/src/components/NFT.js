import React from 'react'

export default function NFT({ item, handleClick }) {

  return (
    <div key={item.id} className="item">
      <img className="item-img" src={item.img} alt={item.name}></img>
      <span className="nft-name">{item.name}</span>
      <span className="nft-artist">{item.artist}</span>
      <button className="item-button" onClick={(e) => handleClick(e, item.id)}>Join</button>
    </div>
  )
}
