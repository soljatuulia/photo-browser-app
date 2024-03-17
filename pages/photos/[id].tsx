import { GetStaticPaths, GetStaticProps } from 'next';
import { getPhotos, getPhotoById, getUserByPhotoId } from '../../api/photos';
import { Photo } from '../../types/photo';
import { User } from '../../types/user';
import SinglePhoto from '../../components/SinglePhoto/SinglePhoto';

export default function PhotoPage({ photo, user }: { photo: Photo; user: User }) {
  return (
    <div>
      <SinglePhoto photo={photo} user={user} />
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

  return { props: { photo, user } };
};
