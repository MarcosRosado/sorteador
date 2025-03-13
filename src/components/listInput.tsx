"use client";

import React, {useState} from 'react';
import {Button} from "@components/button";
import {Check} from "lucide-react";

// Parse the list from local storage to display as a regular list of items,
// using no brackets or quotes.
const parseList = (list: string | null) => {
  if (!list) return '';
  try {
    return JSON.parse(list).join(', ');
  } catch (e) {
    return '';
  }
}

const ListInput = () => {
  const [list, setList] = useState( parseList(localStorage.getItem('listSorteio')));
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
        const items = list.split(',').map((item: string) => item.trim());
        localStorage.setItem('listSorteio', JSON.stringify(items));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={list}
        onChange={(e) => setList(e.target.value)}
        placeholder="Enter items separated by commas"
        className="p-2 border rounded-md"
      />
      <Button
        variant="default"
        size={'sm'}
        onClick={handleSave}
        className="p-2 rounded-md"
      >
        {isSaved ? <Check/> : 'Salvar Lista'}
      </Button>
    </div>
  );
};

export default ListInput;