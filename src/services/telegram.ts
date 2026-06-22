import * as htmlToImage from 'html-to-image';

/**
 * Captures an HTML element as a Blob.
 */
export async function captureElementAsBlob(elementId: string): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID ${elementId} not found`);
  }

  const blob = await htmlToImage.toBlob(element, {
    backgroundColor: '#ffffff',
    pixelRatio: 2, // Higher quality scale
    style: {
      margin: '0',
    }
  });

  if (!blob) {
    throw new Error('Failed to convert element to blob');
  }

  return blob;
}

/**
 * Sends a photo Blob to a Telegram chat via a bot token.
 */
export async function sendPhotoToTelegram(botToken: string, chatId: string, photoBlob: Blob): Promise<void> {
  if (!botToken || !chatId) {
    throw new Error('Telegram Bot Token and Chat ID are required');
  }

  const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('photo', photoBlob, 'label.png');

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description || 'Failed to send to Telegram');
  }
}
