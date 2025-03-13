"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/button';
import {getDrawedItems, getLatestItem, getRemainingItems, getStoredList} from "@lib/utils";
import Popup from "@components/popup";

const MainPage = () => {
  const [list, setList] = useState<string[]>([]);
  const [drawedItems, setDrawedItems] = useState<string[]>([]);
  const [latestItem, setLatestItem] = useState<string | null>(null);
  const [remainingItems, setRemainingItems] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedList = getStoredList();
    const storedDrawedItems = getDrawedItems();
    setList(storedList);
    setDrawedItems(storedDrawedItems);
    setLatestItem(getLatestItem());
    setRemainingItems(getRemainingItems(storedList, storedDrawedItems));
  }, []);

  // Draws an item from the list and adds it to the drawed items list
  // the drawed items cannot be repeated, so comparing the list with the drawed items
  // is necessary to avoid repeating items.
  // then saves the drawed items to local storage.
  const handleDrawItem = () => {
    if (!remainingItems.length) return;

    const randomIndex = Math.floor(Math.random() * remainingItems.length);
    const item = remainingItems[randomIndex];
    setLatestItem(item);

    const updatedList = remainingItems.filter((_, index) => index !== randomIndex);
    setRemainingItems(updatedList);

    setDrawedItems([...drawedItems, item]);
    localStorage.setItem('drawedItems', JSON.stringify([...drawedItems, item]));
    localStorage.setItem('latestItem', JSON.stringify(item));
  };

  const handleClearAll = () => {
    setShowPopup(true);
  }

  const cancelClearAll = () => {
    setShowPopup(false);
  };

  const confirmClearAll = () => {
    setDrawedItems([]);
    setLatestItem(null);
    localStorage.setItem('drawedItems', JSON.stringify([]));
    localStorage.setItem('latestItem', JSON.stringify(null));
    setRemainingItems(list);
    setShowPopup(false);
  }



  const sortedDrawedItems = [...drawedItems].sort();

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <Button onClick={handleDrawItem} className="p-2 rounded-md mr-2">
          Sortear
        </Button>
        <Button onClick={handleClearAll} className="p-2 rounded-md">
          Limpar sorteio
        </Button>
      </div>

      {latestItem && (
        <div className="p-4 bg-yellow-200 rounded-md">
          Latest Item: {latestItem}
        </div>
      )}
      <div>
        <h2>
          Falta{remainingItems.length > 1 ? 'm' : ''}: {remainingItems.length}
        </h2>
      </div>
      <div>
        <div className="flex flex-col items-start gap-2">
          <h2>Valores ordenados:</h2>
          <ul>
            {sortedDrawedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h2>Ordem original:</h2>
          <ul>
            {drawedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {showPopup && (
        <Popup
          message="Tem certeza que deseja reiniciar o sorteio?"
          confirmText={'Não'}
          cancelText={'Sim'}
          onConfirm={cancelClearAll}
          confirmVariant={'success'}
          onCancel={confirmClearAll}
          cancelVariant={'outline'}
        />
      )}
    </div>
  );
};

export default MainPage;