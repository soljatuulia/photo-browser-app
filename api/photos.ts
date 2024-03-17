import { fetchData } from './api';

export const getPhotos = async (page: number = 1, limit: number = 12) => {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  const totalPages = Math.ceil(totalCount / limit);
  const photos = await response.json();
  return { photos, totalPages };
};

export const getPhotosByAlbumId = async (id: string, page: number = 1, limit: number = 12) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}/photos?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Album with ID ${id} not found`);
    } else {
      throw new Error('Failed to fetch photos');
    }
  }
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  const totalPages = Math.ceil(totalCount / limit);
  const photos = await response.json();
  return { photos, totalPages };
};

export const getPhotoById = async (id: number) => {
  const photo = await fetchData(`http://jsonplaceholder.typicode.com/photos/${id}`);
  return photo;
};

export const getFirstPhotosFromAlbum = async (albumId: number, limit: number = 3) => {
  const photos = await fetchData(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=${limit}`
  );
  return photos;
};

export const getTotalPhotos = async (userId: number) => {
  const albums = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  let totalPhotos = 0;
  for (let album of albums) {
    const photos = await fetchData(
      `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
    );
    totalPhotos += photos.length;
  }
  return totalPhotos;
};
