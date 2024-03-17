import Link from 'next/link';
import Image from 'next/image';
import { Stack } from '@mantine/core';
import { Photo } from '../../types/photo';
import { User } from '@/types/user';
import classes from './SinglePhoto.module.css';

interface SinglePhotoProps {
  photo: Photo;
  user: User;
}

export default function SinglePhoto({ photo, user }: SinglePhotoProps) {
  return (
    <Stack className={classes.container}>
      <h1>{photo.title}</h1>
      <Image
        src={photo.url}
        alt={photo.title}
        className={classes.imgResponsive}
        width={600}
        height={600}
      />
      <Link href={`/albums/${photo.albumId}`}>View album</Link>
      <Link href={`/users/${user.id}`}>View user</Link>
    </Stack>
  );
}
