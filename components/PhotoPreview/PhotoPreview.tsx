import Link from 'next/link';
import Image from 'next/image';
import { SimpleGrid, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Photo } from '../../types/photo';
import { Album } from '@/types/album';

interface AlbumProps {
  photos: Photo[];
  album: Album;
}

export default function Album({ photos, album }: AlbumProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <Stack maw={500}>
      <h2>{album.title}</h2>
      <SimpleGrid cols={cols} spacing={15}>
        {photos.map((photo) => (
          <div key={photo.id}>
            <Link href={`/photos/${photo.id}`}>
              <Image src={photo.thumbnailUrl} alt={photo.title} />
            </Link>
          </div>
        ))}
      </SimpleGrid>
      <Link href={`/albums/${album.id}`}>View more...</Link>
    </Stack>
  );
}
