export const getPhotos = async (page: number = 1, limit: number = 10) => {
  const response = await fetch(`http://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  return await response.json();
};
