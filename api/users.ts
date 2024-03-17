import { fetchData } from './api';

export const getUserByPhotoId = async (photoId: number) => {
  // Get the photo
  const photo = await fetchData(`http://jsonplaceholder.typicode.com/photos/${photoId}`);

  // Get the album of the photo
  const album = await fetchData(`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`);

  // Get the user of the album
  const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${album.userId}`);

  return user;
};
