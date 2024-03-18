import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Group, Pagination, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { getPhotos, getPhotosByAlbumId } from '../../api/photos';
import { Photo } from '../../types/photo';

import classes from './PhotoGrid.module.css';
import { useRouter } from 'next/router';

interface PhotoGridProps {
  initialPhotos: Photo[];
  albumId?: string;
  album?: { title: string };
}

export function PhotoGrid({ initialPhotos, albumId, album }: PhotoGridProps) {
  const router = useRouter();
  const initialTotalPages = Math.ceil(initialPhotos.length / 12);

  const [currentPage, setCurrentPage] = useState(Number(router.query.page) || 1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [displayedPhotos, setDisplayedPhotos] = useState(
    Array.isArray(initialPhotos) ? initialPhotos : []
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      notifications.show({
        title: 'Oops!',
        color: 'red',
        message: 'Invalid page number',
      });
      return;
    }

    setCurrentPage(page);
  };

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTinyScreen = useMediaQuery('(max-width: 350px)');
  const cols = isTinyScreen ? 1 : isMobile ? 2 : 3;

  useEffect(() => {
    async function fetchPhotos() {
      try {
        let result;
        if (albumId) {
          result = await getPhotosByAlbumId(albumId, currentPage);
        } else {
          result = await getPhotos(currentPage);
        }
        setDisplayedPhotos(result.photos);
        setTotalPages(result.totalPages);
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, page: currentPage },
          },
          undefined,
          { scroll: false }
        );
      } catch (error) {
        notifications.show({
          title: 'Oops!',
          color: 'red',
          message: (error as Error).message,
        });
      }
    }
    fetchPhotos();
  }, [currentPage, albumId]);

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
                  onChange={handlePageChange}
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
