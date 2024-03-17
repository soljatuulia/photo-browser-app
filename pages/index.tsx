import { GetStaticProps } from 'next';
import { getPhotos } from '../api/photos';
import { PhotoGrid } from '../components/PhotoGrid/PhotoGrid';
import { Photo } from '../types/photo';

interface PhotosIndexProps {
  photos: Photo[];
}

function PhotosIndexPage({ photos }: PhotosIndexProps) {
  return (
    <div>
      <h1>Photo Browser for Futurice</h1>
      <PhotoGrid initialPhotos={photos} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { photos }: { photos: Photo[] } = await getPhotos();
  return {
    props: {
      photos,
    },
  };
};

export default PhotosIndexPage;