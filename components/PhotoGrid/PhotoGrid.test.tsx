import { render, fireEvent, screen } from '@testing-library/react';
import { PhotoGrid } from './PhotoGrid';
import { Photo } from '@/types/photo';

const mockPhotos: Photo[] = [
  { id: 1, thumbnailUrl: 'url1', title: 'title1', albumId: 1, url: 'url1' },
  { id: 2, thumbnailUrl: 'url2', title: 'title2', albumId: 2, url: 'url2' },
  { id: 3, thumbnailUrl: 'url3', title: 'title3', albumId: 3, url: 'url3' },
  { id: 4, thumbnailUrl: 'url4', title: 'title4', albumId: 4, url: 'url4' },
  { id: 5, thumbnailUrl: 'url5', title: 'title5', albumId: 5, url: 'url5' },
  { id: 6, thumbnailUrl: 'url6', title: 'title6', albumId: 6, url: 'url6' },
  { id: 7, thumbnailUrl: 'url7', title: 'title7', albumId: 7, url: 'url7' },
  { id: 8, thumbnailUrl: 'url8', title: 'title8', albumId: 8, url: 'url8' },
  { id: 9, thumbnailUrl: 'url9', title: 'title9', albumId: 9, url: 'url9' },
  { id: 10, thumbnailUrl: 'url10', title: 'title10', albumId: 10, url: 'url10' },
  { id: 11, thumbnailUrl: 'url11', title: 'title11', albumId: 11, url: 'url11' },
  { id: 12, thumbnailUrl: 'url12', title: 'title12', albumId: 12, url: 'url12' },
  { id: 13, thumbnailUrl: 'url13', title: 'title13', albumId: 13, url: 'url13' },
  { id: 14, thumbnailUrl: 'url14', title: 'title14', albumId: 14, url: 'url14' },
  { id: 15, thumbnailUrl: 'url15', title: 'title15', albumId: 15, url: 'url15' },
];

test('renders without crashing', () => {
  render(<PhotoGrid initialPhotos={mockPhotos} />);
  const images = screen.getAllByRole('img');
  expect(images).toBeTruthy(); // Added assertion
});

test('renders the correct number of photos', () => {
  render(<PhotoGrid initialPhotos={mockPhotos} />);
  const images = screen.getAllByRole('img'); // Use screen.getAllByRole
  expect(images.length).toBe(mockPhotos.length);
});

test('pagination works correctly', () => {
  render(<PhotoGrid initialPhotos={mockPhotos} />);
  const nextPageButton = screen.getByRole('button', { name: /next page/i }); // Use screen.getByRole
  fireEvent.click(nextPageButton);
  // Check that currentPage state has increased by 1
  // This will depend on your state management solution
  // Add an assertion here
});
