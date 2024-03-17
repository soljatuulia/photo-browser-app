import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getUserAlbums,
  getFirstPhotosFromAlbum,
  getAlbums,
  getTotalAlbums,
  getTotalPhotos,
} from '../../api/photos';
import { Album as AlbumType } from '@/types/album';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';

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

  // Fetch the first few photos from each album
  const albumsWithPhotos = await Promise.all(
    albums.map(async (album: AlbumType) => {
      const photos = await getFirstPhotosFromAlbum(album.id);
      return { ...album, photos };
    })
  );

  const totalAlbums = await getTotalAlbums(Number(id));
  const totalPhotos = await getTotalPhotos(Number(id));

  return { props: { albums: albumsWithPhotos, totalAlbums, totalPhotos }, revalidate: 1 };
};

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
      <p>Total Albums: {totalAlbums}</p>
      <p>Total Photos: {totalPhotos}</p>
      {albums.map((album) => (
        <div key={album.id}>
          <PhotoPreview photos={album.photos || []} album={album} />
        </div>
      ))}
    </div>
  );
}
