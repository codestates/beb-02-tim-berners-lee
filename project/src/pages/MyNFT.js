import React from 'react'
import MyItem from '../components/MyItem'
import NFTSummary from '../components/NFTSummary'

export default function MyNFT({ nfts, myNFTs, setMyNFTs }) {

  const handleAddressChange = (quantity, itemId) => {
    let tempCart = myNFTs.slice()

    for (const el of tempCart) {
      if (el.itemId === itemId) {
        el.quantity = quantity
      }
    }

    setMyNFTs(tempCart)
  }

  const handleTransfer = (itemId) => {
    setMyNFTs(myNFTs.filter((el) => el.itemId !== itemId))
  }

  const getTotal = () => {
    let total = {
      price: 0,
      quantity: 0,
    }
    for (const item of myNFTs) {
      let result = (total.price + item.price).toFixed(6);
      total.price = Number(result);
      total.quantity += 1;
    }

    return total
  }

  const total = getTotal()

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">My NFT</div>
        <div id="my-item-container">
          {!myNFTs.length ? (
            <div id="item-list-text">
              아직 NFT가 없습니다.
            </div>
          ) : (
            <div id="my-item-list">
              {myNFTs.map((item, idx) => {
                return <MyItem
                  key={idx}
                  item={item}
                  handleAddressChange={handleAddressChange}
                  handleTransfer={handleTransfer}
                />
              })}
            </div>
          )}
          <NFTSummary total={total.price} totalQty={myNFTs.length} />
        </div>
      </div >
    </div>
  )
}
