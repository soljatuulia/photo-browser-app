import { Title } from '@mantine/core';

import classes from './UserInfo.module.css';

interface UserInfoProps {
  totalPhotos: number | null | undefined;
  totalAlbums: number | null | undefined;
}

export default function UserInfo({ totalPhotos, totalAlbums }: UserInfoProps) {
  if (totalPhotos === null || totalPhotos === undefined || typeof totalPhotos !== 'number') {
    totalPhotos = 0;
  }

  if (totalAlbums === null || totalAlbums === undefined || typeof totalAlbums !== 'number') {
    totalAlbums = 0;
  }

  return (
    <div className={classes.container}>
      <Title order={4}>Some stats!</Title>
      <p>Total photos: {totalPhotos}</p>
      <p>Total albums: {totalAlbums}</p>
    </div>
  );
}
