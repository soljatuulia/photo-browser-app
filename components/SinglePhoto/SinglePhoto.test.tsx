import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import SinglePhoto from './SinglePhoto';
import { Photo } from '@/types/photo';

describe('SinglePhoto', () => {
  const mockPhotos: Photo[] = [
    {
      id: 1,
      thumbnailUrl: 'http://example.com/url1',
      title: 'title1',
      albumId: 1,
      url: 'http://example.com/url1',
    },
    {
      id: 2,
      thumbnailUrl: 'http://example.com/url2',
      title: 'title2',
      albumId: 2,
      url: 'http://example.com/url2',
    },
    {
      id: 3,
      thumbnailUrl: 'http://example.com/url3',
      title: 'title3',
      albumId: 3,
      url: 'http://example.com/url3',
    },
    {
      id: 4,
      thumbnailUrl: 'http://example.com/url4',
      title: 'title4',
      albumId: 4,
      url: 'http://example.com/url4',
    },
    {
      id: 5,
      thumbnailUrl: 'http://example.com/url5',
      title: 'title5',
      albumId: 5,
      url: 'http://example.com/url5',
    },
    {
      id: 6,
      thumbnailUrl: 'http://example.com/url6',
      title: 'title6',
      albumId: 6,
      url: 'http://example.com/url6',
    },
    {
      id: 7,
      thumbnailUrl: 'http://example.com/url7',
      title: 'title7',
      albumId: 7,
      url: 'http://example.com/url7',
    },
    {
      id: 8,
      thumbnailUrl: 'http://example.com/url8',
      title: 'title8',
      albumId: 8,
      url: 'http://example.com/url8',
    },
    {
      id: 9,
      thumbnailUrl: 'http://example.com/url9',
      title: 'title9',
      albumId: 9,
      url: 'http://example.com/url9',
    },
    {
      id: 10,
      thumbnailUrl: 'http://example.com/url10',
      title: 'title10',
      albumId: 10,
      url: 'http://example.com/url10',
    },
    {
      id: 11,
      thumbnailUrl: 'http://example.com/url11',
      title: 'title11',
      albumId: 11,
      url: 'http://example.com/url11',
    },
    {
      id: 12,
      thumbnailUrl: 'http://example.com/url12',
      title: 'title12',
      albumId: 12,
      url: 'http://example.com/url12',
    },
    {
      id: 13,
      thumbnailUrl: 'http://example.com/url13',
      title: 'title13',
      albumId: 13,
      url: 'http://example.com/url13',
    },
    {
      id: 14,
      thumbnailUrl: 'http://example.com/url14',
      title: 'title14',
      albumId: 14,
      url: 'http://example.com/url14',
    },
    {
      id: 15,
      thumbnailUrl: 'http://example.com/url15',
      title: 'title15',
      albumId: 15,
      url: 'http://example.com/url15',
    },
  ];

  const mockPhoto = {
    albumId: 1,
    id: 1,
    title: 'Test Photo',
    url: 'http://example.com/test.jpg',
    thumbnailUrl: 'http://example.com/test_thumb.jpg',
  };

  const mockPhotoWithouTitle = {
    albumId: 1,
    id: 1,
    title: '',
    url: 'http://example.com/test.jpg',
    thumbnailUrl: 'http://example.com/test_thumb.jpg',
  };

  const mockUser = {
    id: 1,
  };

  const mockAlbum = {
    userId: 1,
    id: 1,
    title: 'Test Album',
  };

  test('renders photo title', () => {
    render(<SinglePhoto photo={mockPhoto} user={mockUser} albumPhotos={[]} album={mockAlbum} />);
    const titleElement = screen.getByText(/Test Photo/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders link to user', () => {
    render(<SinglePhoto photo={mockPhoto} user={mockUser} albumPhotos={[]} album={mockAlbum} />);
    const linkElement = screen.getByText(/From User 1/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders "Untitled" when photo has no title', () => {
    render(
      <SinglePhoto
        photo={mockPhotoWithouTitle}
        user={mockUser}
        albumPhotos={mockPhotos}
        album={mockAlbum}
      />
    );
    const titleElement = screen.getByText(/Untitled/i);
    expect(titleElement).toBeInTheDocument();
  });
});
