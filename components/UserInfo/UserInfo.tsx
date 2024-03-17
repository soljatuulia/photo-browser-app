import { Title } from '@mantine/core';

import classes from './UserInfo.module.css';

interface UserInfoProps {
  totalPhotos: number;
  totalAlbums: number;
}

export default function UserInfo({ totalPhotos, totalAlbums }: UserInfoProps) {
  return (
    <div className={classes.container}>
      <Title order={4}>Fun facts</Title>
      <p>Total Albums: {totalAlbums}</p>
      <p>Total Photos: {totalPhotos}</p>
    </div>
  );
}
