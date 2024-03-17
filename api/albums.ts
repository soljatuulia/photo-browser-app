import { fetchData } from './api';

export const getAlbums = async () => {
  const albums = await fetchData('https://jsonplaceholder.typicode.com/albums');
  return albums;
};

export const getAlbumById = async (id: number) => {
  const album = await fetchData(`https://jsonplaceholder.typicode.com/albums/${id}`);
  return album;
};

export const getUserAlbums = async (userId: number) => {
  const albums = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  return albums;
};

export const getTotalAlbums = async (userId: number) => {
  const albums = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  return albums.length;
};
