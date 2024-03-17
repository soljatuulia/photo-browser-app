import { GetStaticPaths, GetStaticProps } from 'next';
import { getAlbums, getPhotosByAlbumId } from '../../api/photos';
import Album from '../../components/PhotoPreview/PhotoPreview';
import { Photo } from '@/types/photo';
import { useRouter } from 'next/router';
import { PhotoGrid } from '@/components/PhotoGrid/PhotoGrid';

export default function AlbumPage({
  photos,
  album,
}: {
  photos: Photo[];
  album: { title: string };
}) {
  const router = useRouter();
  const albumId = router.query.id as string;

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
  const albums = await getAlbums();

  // Find the album with the matching ID
  const album = albums.find((album: { id: number }) => album.id === parseInt(id));

  // If the album is not found, throw an error
  if (!album) {
    throw new Error('Album not found');
  }

  return { props: { photos, album } };
};
