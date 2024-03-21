import { GetStaticProps } from 'next';
import { getPhotos } from '../api/photos';
import { PhotoGrid } from '../components/PhotoGrid/PhotoGrid';
import { Photo } from '../types/photo';

interface PhotosIndexProps {
  photos: Photo[];
  totalPages: number
}

function PhotosIndexPage({ photos, totalPages }: PhotosIndexProps) {
  return (
    <div>
      <PhotoGrid initialPhotos={photos} totalPages={totalPages} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { photos, totalPages }: { photos: Photo[]; totalPages: number } = await getPhotos();
  return {
    props: {
      photos,
      totalPages,
    },
  };
};

export default PhotosIndexPage;
