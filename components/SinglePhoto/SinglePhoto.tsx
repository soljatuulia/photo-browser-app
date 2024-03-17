import Link from 'next/link';
import Image from 'next/image';
import { Group, Stack } from '@mantine/core';
import { Photo } from '../../types/photo';
import { User } from '@/types/user';
import classes from './SinglePhoto.module.css';

interface SinglePhotoProps {
  photo: Photo;
  user: User;
}

export default function SinglePhoto({ photo, user }: SinglePhotoProps) {
  return (
    <Group>
      <Stack className={classes.container}>
        <h1>{photo.title}</h1>
        <Image
          src={photo.url}
          alt={photo.title}
          className={classes.imgResponsive}
          width={600}
          height={600}
        />
      </Stack>
      <Link href={`/albums/${photo.albumId}`}>View album</Link>
      <Link href={`/users/${user.id}`}>View user</Link>
    </Group>
  );
}
