import { GetStaticPaths, GetStaticProps } from 'next';
import { getPhotosByAlbumId } from '../../api/photos';
import { getAlbums } from '@/api/albums';
import { Photo } from '@/types/photo';
import { PhotoGrid } from '@/components/PhotoGrid/PhotoGrid';

export default function AlbumPage({
  photos = [],
  album,
  albumId,
}: {
  photos: Photo[];
  album: { title: string };
  albumId: string;
}) {
  return (
    <div>
      <PhotoGrid initialPhotos={photos} albumId={albumId} album={album} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const albums = await getAlbums();
  const paths = albums.map((album: { id: number }) => ({
    params: { id: album.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const photos = await getPhotosByAlbumId(id);

  // Fetch all albums
  const allAlbums = await getAlbums();

  // Find the album with the matching ID
  const album = allAlbums.find((albumItem: { id: number }) => albumItem.id === parseInt(id, 10));

  if (!album) {
    return { notFound: true };
  }

  return { props: { photos, album, albumId: id } };
};
