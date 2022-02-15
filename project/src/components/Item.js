import React from 'react'

export default function item({ item, join, handleBuy }) {

    return (
        < div key={item.id} className="item" >
            <img className="item-img" src={item.img} alt={item.name}></img>
            <span className="nft-name">{item.name}</span>
            <span className="nft-artist">⧫ {item.price}</span>
            <button className="item-button" onClick={(e) => handleBuy(e, item)}>Buy</button>
        </div >
    )
}