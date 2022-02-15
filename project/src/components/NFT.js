import React from 'react'

export default function NFT({ item, join, handleJoin }) {

  return (
    <div key={item.id} className="item">
      <img className="item-img" src={item.img} alt={item.name}></img>
      <span className="nft-name">{item.name}</span>
      <span className="nft-artist">{item.artist}</span>
      <button className="join-button" onClick={(e) => handleJoin(e, item.name)}>Join</button>
    </div>
  )
}
