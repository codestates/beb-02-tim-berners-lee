import React from 'react'

export default function item({ item, handleBuy }) {

    return (
        < div key={item.tokenId} className="item" >
            <img className="item-img" src={item.tokenURI} alt={item.name}></img>
            <span className="nft-name">{item.name} #{item.tokenId}</span>
            <span className="nft-artist">⧫ {item.tokenPrice}</span>
            <button className="item-button" onClick={(e) => handleBuy(e, item)}>Buy</button>
        </div >
    )
}