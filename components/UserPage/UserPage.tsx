import { useRouter } from 'next/router';
import { Group, Stack, Title, Text } from '@mantine/core';

import PhotoPreview from '../PhotoPreview/PhotoPreview';
import UserInfo from '../UserInfo/UserInfo';
import { Album } from '@/types/album';

import classes from './UserPage.module.css';

interface UserPageProps {
  albums: Album[];
  totalPhotos: number;
  totalAlbums: number;
}

export default function UserPage({ albums, totalPhotos, totalAlbums }: UserPageProps) {
  const router = useRouter();
  const { id } = router.query;

  if (!Array.isArray(albums)) {
    return <Text>Sorry! No valid albums data to display.</Text>;
  }

  return (
    <>
      <Title order={2} className={classes.title}>
        All Albums from User {id}
      </Title>
      <Group gap="xl" align="start" className={classes.container}>
        <Stack className={classes.albums}>
          {albums.map((album) => (
            <div key={album.id}>
              <PhotoPreview photos={album.photos || []} album={album} />
            </div>
          ))}
        </Stack>
        <UserInfo totalAlbums={totalAlbums} totalPhotos={totalPhotos} />
      </Group>
    </>
  );
}
