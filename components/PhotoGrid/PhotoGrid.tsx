import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Group, Pagination, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
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
  const [displayedPhotos, setDisplayedPhotos] = useState(
    Array.isArray(initialPhotos) ? initialPhotos : []
  );

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTinyScreen = useMediaQuery('(max-width: 350px)');

  const cols = isTinyScreen ? 1 : isMobile ? 2 : 3;

  useEffect(() => {
    async function fetchPhotos() {
      try {
        if (currentPage < 1 || currentPage > totalPages) {
          notifications.show({
            title: 'Oops!',
            color: 'red',
            message: 'Invalid page number',
          });
          return;
        }

        let photos: Photo[];
        let pages: number;
        if (albumId) {
          const result = await getPhotosByAlbumId(albumId, currentPage);
          photos = result.photos;
          pages = result.totalPages;
        } else {
          const result = await getPhotos(currentPage);
          photos = result.photos;
          pages = result.totalPages;
        }
        setDisplayedPhotos(photos);
        setTotalPages(pages);
      } catch (error) {
        notifications.show({
          title: 'Oops!',
          color: 'red',
          message: (error as Error).message,
        });
      }
    }
    fetchPhotos();
  }, [currentPage, albumId, totalPages]);

  return (
    <div>
      <Stack gap="lg" maw={500} className={classes.container}>
        {album ? (
          <Title order={2} className={classes.title}>
            {album.title || 'Untitled'}
          </Title>
        ) : (
          <Title order={2}>Browse all photos</Title>
        )}
        {displayedPhotos.length > 0 ? (
          <>
            <SimpleGrid cols={cols} spacing={15}>
              {displayedPhotos.map((photo) => (
                <div key={photo.id}>
                  <Link href={`/photos/${photo.id}`}>
                    <Image
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      width={150}
                      height={150}
                      loading="lazy"
                    />
                  </Link>
                </div>
              ))}
            </SimpleGrid>
            <Group justify="center">
              {totalPages > 1 && (
                <Pagination
                  value={currentPage}
                  total={totalPages}
                  onChange={setCurrentPage}
                  size="md"
                  color="pink"
                  siblings={1}
                  boundaries={1}
                />
              )}
            </Group>
          </>
        ) : (
          <Text>Sorry, no photos found!</Text>
        )}
      </Stack>
    </div>
  );
}
