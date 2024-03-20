import { GetStaticPaths, GetStaticProps } from 'next';
import { getPhotos, getPhotoById, getFirstPhotosFromAlbum } from '../../api/photos';
import { getAlbumById } from '@/api/albums';
import { getUserByPhotoId } from '@/api/users';
import { Photo } from '../../types/photo';
import { User } from '../../types/user';
import SinglePhoto from '../../components/SinglePhoto/SinglePhoto';
import { Album } from '@/types/album';

export default function PhotoPage({
  photo = { albumId: 0, id: 0, title: '', url: '', thumbnailUrl: '' },
  user,
  albumPhotos = [],
  album = { userId: 0, id: 0, title: '' },
}: {
  photo: Photo;
  user: User;
  albumPhotos: Photo[];
  album: Album;
}) {
  return (
    <div>
      <SinglePhoto photo={photo} user={user} albumPhotos={albumPhotos} album={album} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { photos } = await getPhotos();
    const paths = photos.map((photo: Photo) => ({
      params: { id: photo.id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const photo = await getPhotoById(Number(params.id));
  const user = await getUserByPhotoId(Number(params.id));
  const albumPhotos = await getFirstPhotosFromAlbum(photo.albumId);
  const album = await getAlbumById(photo.albumId);

  return { props: { photo, user, albumPhotos, album } };
};
