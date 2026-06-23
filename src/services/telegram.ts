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

/**
 * Helper to convert a Data URL (base64) to a Blob
 */
function dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

/**
 * Sends a media group (album) with both the original image and the generated label to Telegram.
 */
export async function sendAlbumToTelegram(botToken: string, chatId: string, originalImageBase64: string, labelBlob: Blob): Promise<void> {
  if (!botToken || !chatId) {
    throw new Error('Telegram Bot Token and Chat ID are required');
  }

  const originalBlob = dataURItoBlob(originalImageBase64);

  const url = `https://api.telegram.org/bot${botToken}/sendMediaGroup`;
  const formData = new FormData();
  formData.append('chat_id', chatId);
  
  // Media array instructing Telegram how to read the attachments
  const media = [
    { type: 'photo', media: 'attach://original' },
    { type: 'photo', media: 'attach://label' }
  ];
  formData.append('media', JSON.stringify(media));

  // Attach files with corresponding names
  formData.append('original', originalBlob, 'original.jpg');
  formData.append('label', labelBlob, 'label.png');

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description || 'Failed to send album to Telegram');
  }
}
