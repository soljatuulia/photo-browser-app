import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { getPhotos, getPhotosByAlbumId } from '../../api/photos';
import { Photo } from '../../types/photo';

import classes from './PhotoGrid.module.css';

interface PhotoGridProps {
  initialPhotos: Photo[];
	albumId?: string;
	album?: { title: string };
}

export function PhotoGrid({ initialPhotos, albumId, album }: PhotoGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const initialTotalPages = Math.ceil(initialPhotos.length / 12);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [displayedPhotos, setDisplayedPhotos] = useState(Array.isArray(initialPhotos) ? initialPhotos : []);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    async function fetchPhotos() {
      let photos, totalPages;
      if (albumId) {
        const result = await getPhotosByAlbumId(albumId, currentPage);
        photos = result.photos;
        totalPages = result.totalPages;
      } else {
        const result = await getPhotos(currentPage);
        photos = result.photos;
        totalPages = result.totalPages;
      }
      setDisplayedPhotos(photos);
      setTotalPages(totalPages);
    }
    fetchPhotos();
  }, [currentPage, albumId]);

  return (
    <div>
      <Stack gap="lg" maw={500}>
				{album && <h2>{album.title}</h2>}
        <SimpleGrid cols={cols} spacing={15}>
          {displayedPhotos.map((photo) => (
            <div key={photo.id}>
              <Link href={`/photos/${photo.id}`}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </Link>
            </div>
          ))}
        </SimpleGrid>
				<Group justify="center">
        <Pagination
          value={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
          size="md"
          siblings={1}
          boundaries={1}
        />
      </Group>
      </Stack>
    </div>
  );
}
