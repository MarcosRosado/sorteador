"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@components/button';
import { getStoredList } from "@lib/utils";
import JSZip from "jszip";
import {Input} from "@components/input";

const squareCenters = [
  [145, 406], [261, 406], [382, 406], [503, 406], [624, 406],
  [145, 523], [261, 523], [382, 523], [503, 523], [624, 523],
  [145, 640], [261, 640], [503, 640], [624, 640],
  [145, 758], [261, 758], [382, 758], [503, 758], [624, 758],
  [145, 875], [261, 875], [382, 875], [503, 875], [624, 875]
];

const cardInfo = [
  [160, 965], [382, 990]
];

const GenerateCards = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [numItems, setNumItems] = useState<number | ''>('');
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [numCards, setNumCards] = useState<number | ''>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setList(getStoredList());
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };


  const handleDraw = (cardNumber: number, callback: (dataUrl: string) => void) => {
    if (!canvasRef.current || !image) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = image as string;
    img.onload = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = 'bold 20px Montserrat';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw the Cartela number
      const [cartelaX, cartelaY] = cardInfo[0];
      ctx.fillText(`Cartela: ${cardNumber}`, cartelaX, cartelaY);

      const itemsToDraw = [];
      const availableItems = [...list];

      // Randomly select items to draw
      for (let i = 0; i < Math.min(numItems as number, squareCenters.length); i++) {
        if (availableItems.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        itemsToDraw.push(availableItems[randomIndex]);
        availableItems.splice(randomIndex, 1);
      }

      // Draw the items on the canvas
      itemsToDraw.forEach((item, index) => {
        const [x, y] = squareCenters[index];
        const lines = wrapText(ctx, item, 100); // Wrap text to fit the square
        lines.forEach((line, i) => {
          const textWidth = ctx.measureText(line).width;
          const adjustedY = y - Math.min(20, textWidth / 2);
          ctx.fillText(line, x, adjustedY + i * 26 + 10);
        });
      });

      const dataUrl = canvasRef.current.toDataURL('image/png');
      callback(dataUrl);
    };
  };

  const generateAndDownloadCards = async () => {
    const zip = new JSZip();
    if (numCards === '') return;

    setLoading(true);

    const drawCardPromises = [];
    for (let i = 0; i < numCards; i++) {
      drawCardPromises.push(
        new Promise<void>((resolve) => {
          handleDraw(i + 1, (dataUrl) => {
            // Convert base64 to binary data
            const imageData = dataUrl.split(',')[1];
            const binaryData = atob(imageData);
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const uintArray = new Uint8Array(arrayBuffer);
            for (let j = 0; j < binaryData.length; j++) {
              uintArray[j] = binaryData.charCodeAt(j);
            }

            // Add the image to the ZIP file
            zip.file(`cartela_${i + 1}.png`, arrayBuffer);
            resolve();
          });
        })
      );
    }

    await Promise.all(drawCardPromises);

    // Generate the ZIP file
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // Trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'cartelas.zip';
      link.click();
      setLoading(false);
    });
  };

  // Wrap text to fit a certain width, used to fit text inside the squares
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2">
          <Input
            label={'Número de elementos'}
            type="number"
            value={numItems}
            onChange={(e) => setNumItems(e.target.value === '' ? '' : Math.min(Number(e.target.value), 24))}
            className="p-2 border rounded-md"
          />
          <Input
            label={'Numero de cartelas'}
            type="number"
            value={numCards}
            onChange={(e) => setNumCards(e.target.value === '' ? '' : Math.max(Number(e.target.value), 1))}
            className="p-2 border rounded-md"
          />
          <div className="flex flex-col mt-auto">
            <label className="p-2 border rounded-md cursor-pointer w-auto hover:bg-gray-200">
              Carregar cartela
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
            </label>
          </div>
        </div>
        {filename && <p>Arquivo: {filename}</p>}
        <Button variant="default" size="lg" onClick={generateAndDownloadCards} className="p-2 rounded-md w-full"
                disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar e baixar cartelas'}
        </Button>
        {loading && <div className="loader">Loading...</div>}
        <canvas ref={canvasRef} className="border rounded-md w-100 h-150"/>
      </div>
    </div>
  );
};

export default GenerateCards;