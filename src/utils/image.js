export const convertBlobToImage = (imagen) => {
  if (typeof imagen === 'object' && Array.isArray(imagen?.data)) {
    // Buffer seguro para arrays grandes
    const binaryString = imagen.data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binaryString);
    return `data:image/jpeg;base64,${base64String}`;
  } else if (typeof imagen === 'string') {
    return imagen;
  }
  return '/vite.svg';
}