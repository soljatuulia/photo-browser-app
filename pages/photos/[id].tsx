import { GetStaticPaths, GetStaticProps } from 'next';
import { getPhotos, getPhotoById } from '../../api/photos';
import { Photo } from '../../types/photo';
import SinglePhoto from '../../components/SinglePhoto/SinglePhoto';

export default function PhotoPage({ photo }: { photo: Photo }) {
  return <SinglePhoto photo={photo} />;
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

  return { props: { photo } };
};
