import { GetStaticPaths, GetStaticProps } from 'next';
import { getFirstPhotosFromAlbum, getTotalPhotos } from '../../api/photos';
import { getUserAlbums, getTotalAlbums, getAlbums } from '@/api/albums';
import { Album as AlbumType } from '@/types/album';
import UserPage from '@/components/UserPage/UserPage';

export default function User({
  albums,
  totalAlbums,
  totalPhotos,
}: {
  albums: AlbumType[];
  totalAlbums: number;
  totalPhotos: number;
}) {
  return (
    <div>
      <UserPage albums={albums} totalAlbums={totalAlbums} totalPhotos={totalPhotos} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all albums
  const albums = await getAlbums();

  // Extract unique user IDs from the albums
  const userIds: string[] = Array.from(new Set(albums.map((album: AlbumType) => album.userId)));

  // Generate paths for each user
  const paths = userIds.map((id: string) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const albums = await getUserAlbums(Number(id));

  // Fetch the first photos from each album
  const albumsWithPhotos = await Promise.all(
    albums.map(async (album: AlbumType) => {
      const photos = await getFirstPhotosFromAlbum(album.id);
      return { ...album, photos };
    })
  );

  const totalAlbums = await getTotalAlbums(Number(id));
  const totalPhotos = await getTotalPhotos(Number(id));

  return { props: { albums: albumsWithPhotos, totalAlbums, totalPhotos } };
};
