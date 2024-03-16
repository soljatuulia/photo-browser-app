// pages/photos/index.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPhotos } from '../../api/photos';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotosIndexProps {
  photos: Photo[];
}

function PhotosIndexPage({ photos }: PhotosIndexProps) {
  const router = useRouter();
  const { query } = router;

  const currentPage = Number(query.page) || 1; // Use query parameter for current page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchPhotos() {
      const fetchedPhotos = await getPhotos(currentPage);
      setTotalPages(Math.ceil(fetchedPhotos.length / 10)); // Assuming 10 photos per page
    }
    fetchPhotos();
  }, [currentPage]);

  const handlePrevPage = () => {
    router.push(`/photos?page=${currentPage - 1}`); // Navigate to previous page
  };

  const handleNextPage = () => {
    router.push(`/photos?page=${currentPage + 1}`); // Navigate to next page
  };

  return (
    <div>
      <h1>Photos</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-thumbnail">
            <Link href={`/photos/${photo.id}`}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </Link>
          </div>
        ))}
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const photos: Photo[] = await getPhotos();
  return {
    props: {
      photos,
    },
  };
}

export default PhotosIndexPage;
