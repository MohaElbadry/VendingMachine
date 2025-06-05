import React from "react";

const VALID_COINS = [0.5, 1, 2, 5, 10];

interface CoinInserterProps {
  onInsertCoin: (value: number) => void;
}

export const CoinInserter: React.FC<CoinInserterProps> = ({ onInsertCoin }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Insert Coins</h2>
      <div className="grid grid-cols-3 gap-2">
        {VALID_COINS.map((coin) => (
          <button
            key={coin}
            onClick={() => onInsertCoin(coin)}
            className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded"
          >
            {coin} MAD
          </button>
        ))}
      </div>
    </div>
  );
};
