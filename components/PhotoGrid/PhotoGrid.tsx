import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Group, Input, Loader, Pagination, SimpleGrid, Stack, Text, Title } from '@mantine/core';
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
  const router = useRouter();
  const initialTotalPages = Math.ceil(initialPhotos.length / 12);

  const [currentPage, setCurrentPage] = useState(Number(router.query.page) || 1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [displayedPhotos, setDisplayedPhotos] = useState(
    Array.isArray(initialPhotos) ? initialPhotos : []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      try {
        let result;
        if (albumId) {
          result = await getPhotosByAlbumId(albumId, currentPage);
        } else {
          result = await getPhotos(currentPage);
        }

        const filteredPhotos = result.photos.filter((photo: Photo) =>
          photo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setDisplayedPhotos(filteredPhotos);
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
      setIsLoading(false);
    }
    fetchPhotos();
  }, [currentPage, albumId, searchTerm]);

  return (
    <div>
      <Stack gap="lg" maw={500} className={classes.container}>
        {album ? (
          <Title order={2} className={classes.title}>
            Explore photos from {album.title || 'Untitled'}
          </Title>
        ) : (
          <Title order={2}>Explore All Photos</Title>
        )}

        <Input
          className={classes.search}
          placeholder="Search photos by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />

        {isLoading ? (
          <div className={classes.loader}>
            <Loader size="lg" type="bars" color="pink" />
          </div>
        ) : displayedPhotos.length > 0 ? (
          <>
            <SimpleGrid cols={cols} spacing={15}>
              {displayedPhotos.map((photo) => (
                <div key={photo.id} data-testid="photo">
                  <Link href={`/photos/${photo.id}`}>
                    <Image
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      width={150}
                      height={150}
                      priority
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
