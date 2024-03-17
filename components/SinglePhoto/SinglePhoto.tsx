import Link from 'next/link';
import Image from 'next/image';
import { Group, Stack, Title, Text } from '@mantine/core';
import { Photo } from '../../types/photo';
import { User } from '@/types/user';
import classes from './SinglePhoto.module.css';
import PhotoPreview from '../PhotoPreview/PhotoPreview';
import { Album } from '@/types/album';

interface SinglePhotoProps {
  photo: Photo;
  user: User;
  albumPhotos: Photo[];
  album: Album;
}

export default function SinglePhoto({ photo, user, albumPhotos, album }: SinglePhotoProps) {
  if (!photo) {
    return <Text>Sorry! We didn't find the photo.</Text>;
  }

  return (
    <Stack className={classes.container} gap="xs">
      <Title className={classes.title} order={2}>
        {photo.title || 'Untitled'}
      </Title>
      <Group align="start">
        <Image
          src={photo.url}
          alt={photo.title}
          className={classes.imgResponsive}
          width={600}
          height={600}
        />
        <Stack className={classes.linksContainer}>
          <Link href={`/albums/${photo.albumId}`}>View album</Link>
          {user && <Link href={`/users/${user.id}`}>View user</Link>}
        </Stack>
      </Group>
      {albumPhotos.length > 0 && <PhotoPreview photos={albumPhotos} album={album} />}
    </Stack>
  );
}
