import { Group, Stack } from '@mantine/core';
import PhotoPreview from '../PhotoPreview/PhotoPreview';
import UserInfo from '../UserInfo/UserInfo';
import { Album } from '@/types/album';

interface UserPageProps {
  albums: Album[];
  totalPhotos: number;
  totalAlbums: number;
}

export default function UserPage({ albums, totalPhotos, totalAlbums }: UserPageProps) {
  return (
    <Group gap="xl" align="start">
      <Stack>
        {albums.map((album) => (
          <div key={album.id}>
            <PhotoPreview photos={album.photos || []} album={album} />
          </div>
        ))}
      </Stack>
      <UserInfo totalAlbums={totalAlbums} totalPhotos={totalPhotos} />
    </Group>
  );
}
