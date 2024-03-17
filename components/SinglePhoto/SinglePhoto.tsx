import { Stack } from '@mantine/core';
import { Photo } from '../../types/photo';

import classes from './SinglePhoto.module.css';
import Link from 'next/link';
import { User } from '@/types/user';

interface SinglePhotoProps {
  photo: Photo;
	user: User;
}

export default function SinglePhoto({ photo, user }: SinglePhotoProps) {
  return (
    <Stack className={classes.container}>
      <h1>{photo.title}</h1>
      <img src={photo.url} alt={photo.title} className={classes.imgResponsive} />
			<Link href={`/albums/${photo.albumId}`}>View album</Link>
			<Link href={`/users/${user.id}`}>View user</Link>
    </Stack>
  );
}
