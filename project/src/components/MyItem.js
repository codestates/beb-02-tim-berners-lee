import { useState } from 'react';

export default function MyItem({
  item,
  handleAddressChange,
  handleTransfer,
  quantity,
  account,
}) {
  const [recipient, setRecipient] = useState('');

  const sendToken = (tokenId) => {
    item.contract.methods
      .transferFrom(account, recipient, tokenId)
      .send({
        from: account,
      })
      .then(() => {
        setRecipient('');
      });
  };

  return (
    <li className="cart-item-body">
      <div className="cart-item-thumbnail">
        <img src={item.tokenURI} alt={item.name} />
      </div>
      <div className="cart-item-info">
        <div className="cart-item-title" data-testid={item.name}>
          {item.name} #{item.tokenId}
        </div>
        <div className="cart-item-price">⧫ {item.tokenPrice}</div>
      </div>
      <input
        className="cart-item-quantity"
        value={recipient}
        // value={quantity}
        onChange={(e) => {
          setRecipient(e.target.value);
          // handleAddressChange(Number(e.target.value), item.id);
        }}
      ></input>
      <button
        className="cart-item-delete"
        onClick={() => {
          sendToken(item.tokenId);
          // handleTransfer(item.itemId);
        }}
      >
        전송
      </button>
    </li>
  );
}
