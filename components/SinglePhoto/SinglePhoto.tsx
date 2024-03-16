import { Stack } from '@mantine/core';
import { Photo } from '../../types/photo';

import classes from './SinglePhoto.module.css';

interface SinglePhotoProps {
  photo: Photo;
}

export default function SinglePhoto({ photo }: SinglePhotoProps) {
  return (
    <Stack className={classes.container}>
      <h1>{photo.title}</h1>
      <img src={photo.url} alt={photo.title} className={classes.imgResponsive} />
    </Stack>
  );
}
