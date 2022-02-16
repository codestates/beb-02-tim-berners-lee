import React, { useState } from 'react';
import MyItem from '../components/MyItem';
import NFTSummary from '../components/NFTSummary';

export default function MyNFT({ nfts, myNFTs, setMyNFTs, account }) {
  const [total, setTotal] = useState(0);

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">My NFT</div>
        <div id="my-item-container">
          {!myNFTs.length ? (
            <div id="item-list-text">아직 NFT가 없습니다.</div>
          ) : (
            <div id="my-item-list">
              {myNFTs.map((item, idx) => {
                return (
                  <MyItem
                    key={idx}
                    item={item}
                    account={account}
                    setTotal={setTotal}
                  />
                );
              })}
            </div>
          )}
          <NFTSummary total={total} totalQty={myNFTs.length} />
        </div>
      </div>
    </div>
  );
}
