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
}

export default function Album({ photos, album }: AlbumProps) {
  if (!album) {
    return <Text>Sorry! No album data to display.</Text>;
  }

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <Stack maw={500}>
      <Title order={3} lineClamp={1} className={classes.title}>
        {album.title || 'Untitled'}
      </Title>
      {photos.length > 0 ? (
        <>
          <SimpleGrid cols={cols} spacing={15} className={classes.grid}>
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
