import Link from 'next/link';
import Image from 'next/image';
import { SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Photo } from '../../types/photo';
import type { Album } from '@/types/album';

import classes from './PhotoPreview.module.css';

interface AlbumProps {
  photos: Photo[];
  album: Album;
  isPhotoPage?: boolean;
}

export default function PhotoPreview({ photos, album, isPhotoPage = false }: AlbumProps) {
  if (!album) {
    return <Text>Sorry! No album info to display.</Text>;
  }

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTinyScreen = useMediaQuery('(max-width: 365px)');

  const cols = isTinyScreen ? 1 : isMobile ? 2 : 3;

  return (
    <Stack maw={500}>
      <Title order={3} lineClamp={1} className={classes.title}>
        {isPhotoPage ? 'More from the album ' : ''}
        {album.title || 'Untitled'}
      </Title>
      {photos.length > 0 ? (
        <>
          <SimpleGrid cols={cols} spacing={15}>
            {photos.map((photo) =>
              photo && photo.id && photo.thumbnailUrl && photo.title ? (
                <div key={photo.id}>
                  <Link href={`/photos/${photo.id}`}>
                    <Image src={photo.thumbnailUrl} alt={photo.title} width={150} height={150} />
                  </Link>
                </div>
              ) : null
            )}
          </SimpleGrid>
          <Link href={`/albums/${album.id}`} className={classes.more}>
            View more...
          </Link>
        </>
      ) : (
        <Text>Sorry, no photos found.</Text>
      )}
    </Stack>
  );
}
