export const getPhotos = async (page: number = 1, limit: number = 12) => {
  const response = await fetch(`http://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
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