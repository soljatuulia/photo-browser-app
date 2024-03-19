import Link from 'next/link';
import Image from 'next/image';
import { Group, Stack, Title } from '@mantine/core';

import { Photo } from '../../types/photo';
import { User } from '@/types/user';
import PhotoPreview from '../PhotoPreview/PhotoPreview';
import { Album } from '@/types/album';

import classes from './SinglePhoto.module.css';

interface SinglePhotoProps {
  photo: Photo;
  user: User;
  albumPhotos: Photo[];
  album: Album;
}

export default function SinglePhoto({ photo, user, albumPhotos, album }: SinglePhotoProps) {
  const otherPhotos = albumPhotos.filter((albumPhoto) => albumPhoto.id !== photo.id);

  return (
    <Stack className={classes.container} gap="xs">
      <Title className={classes.title} order={2}>
        {photo.title || 'Untitled'}
      </Title>
      {user && <Link href={`/users/${user.id}`}>From User {user.id}</Link>}
      <Group align="start">
        <Image
          src={photo.url}
          alt={photo.title}
          className={classes.singlePhoto}
          width={600}
          height={600}
        />
      </Group>
      {otherPhotos.length > 0 && <PhotoPreview photos={otherPhotos} album={album} isPhotoPage />}
    </Stack>
  );
}
