import React from 'react'

export default function NFTSummary({ totalQty, total }) {
  return (
    <div id="order-summary-container">
      <h4>NFT 합계</h4>
      <div id="order-summary">
        총 아이템 개수 : <span className="order-summary-text">{totalQty} 개</span>
        <hr></hr>
        <div id="order-summary-total">
          합계 : <span className="order-summary-text">⧫ {total}</span>
        </div>
      </div>
    </div >
  )
}
