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

export const getPhotoById = async (id: number) => {
  const response = await fetch(`http://jsonplaceholder.typicode.com/photos/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch photo');
  }
  const photo = await response.json();
  return photo;
};

export const getAlbums = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  const albums = await response.json();
  return albums;
};

export const getPhotosByAlbumId = async (id: string, page: number = 1, limit: number = 12) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}/photos?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  const totalPages = Math.ceil(totalCount / limit);
  const photos = await response.json();
  return { photos, totalPages };
};

export const getUserAlbums = async (userId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  if (!response.ok) {
    throw new Error('Failed to fetch user albums');
  }
  const albums = await response.json();
  return albums;
};

export const getFirstPhotosFromAlbum = async (albumId: number, limit: number = 3) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  const photos = await response.json();
  return photos;
};

// ...

export const getTotalAlbums = async (userId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  const albums = await response.json();
  return albums.length;
};

export const getTotalPhotos = async (userId: number) => {
  const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  if (!albumsResponse.ok) {
    throw new Error('Failed to fetch albums');
  }
  const albums = await albumsResponse.json();
  let totalPhotos = 0;
  for (let album of albums) {
    const photosResponse = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
    );
    if (!photosResponse.ok) {
      throw new Error('Failed to fetch photos');
    }
    const photos = await photosResponse.json();
    totalPhotos += photos.length;
  }
  return totalPhotos;
};

export const getUserByPhotoId = async (photoId: number) => {
  // Get the photo
  const photoResponse = await fetch(`http://jsonplaceholder.typicode.com/photos/${photoId}`);
  if (!photoResponse.ok) {
    throw new Error('Failed to fetch photo');
  }
  const photo = await photoResponse.json();

  // Get the album of the photo
  const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`);
  if (!albumResponse.ok) {
    throw new Error('Failed to fetch album');
  }
  const album = await albumResponse.json();

  // Get the user of the album
  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
  if (!userResponse.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = await userResponse.json();

  return user;
};