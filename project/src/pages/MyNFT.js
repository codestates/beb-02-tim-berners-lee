import React, { useState } from 'react'
import MyItem from '../components/MyItem'
import OrderSummary from '../components/OrderSummary'

export default function ShoppingCart({ nfts, myNFTs, setMyNFTs }) {
  const [checkedItems, setCheckedItems] = useState(myNFTs.map((el) => el.itemId))

  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    }
    else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(myNFTs.map((el) => el.itemId))
    }
    else {
      setCheckedItems([]);
    }
  };

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
    setCheckedItems(checkedItems.filter((el) => el !== itemId))
  }

  const getTotal = () => {
    let cartIdArr = myNFTs.map((el) => el.itemId)
    let total = {
      price: 0,
      quantity: 0,
    }
    for (let i = 0; i < cartIdArr.length; i++) {
      if (checkedItems.indexOf(cartIdArr[i]) > -1) {
        let quantity = myNFTs[i].quantity
        let price = nfts.filter((el) => el.id === myNFTs[i].itemId)[0].price

        total.price = total.price + quantity * price
        total.quantity = total.quantity + quantity
      }
    }
    return total
  }

  const renderItems = nfts.filter((el) => myNFTs.map((el) => el.itemId).indexOf(el.id) > -1)
  const total = getTotal()

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">My NFT</div>
        <span id="shopping-cart-select-all">
          <input
            type="checkbox"
            checked={
              checkedItems.length === myNFTs.length ? true : false
            }
            onChange={(e) => handleAllCheck(e.target.checked)} >
          </input>
          <label >전체 선택</label>
        </span>
        <div id="shopping-cart-container">
          {!myNFTs.length ? (
            <div id="item-list-text">
              아직 NFT가 없습니다.
            </div>
          ) : (
            <div id="cart-item-list">
              {renderItems.map((item, idx) => {
                const quantity = myNFTs.filter(el => el.itemId === item.id)[0].quantity
                return <MyItem
                  key={idx}
                  handleCheckChange={handleCheckChange}
                  handleAddressChange={handleAddressChange}
                  handleTransfer={handleTransfer}
                  item={item}
                  checkedItems={checkedItems}
                  quantity={quantity}
                />
              })}
            </div>
          )}
          <OrderSummary total={total.price} totalQty={total.quantity} />
        </div>
      </div >
    </div>
  )
}
