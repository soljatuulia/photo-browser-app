import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Group, SimpleGrid, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { getPhotos } from '../../api/photos';
import { Photo } from '../../types/photo';

interface PhotoGridProps {
  initialPhotos: Photo[];
}

export function PhotoGrid({ initialPhotos }: PhotoGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const initialTotalPages = Math.ceil(initialPhotos.length / 12);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [displayedPhotos, setDisplayedPhotos] = useState(initialPhotos);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    async function fetchPhotos() {
      const { photos, totalPages } = await getPhotos(currentPage);
      setDisplayedPhotos(photos);
      setTotalPages(totalPages);
    }
    fetchPhotos();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <Stack gap="lg">
        <SimpleGrid cols={cols} spacing={15}>
          {displayedPhotos.map((photo) => (
            <div key={photo.id}>
              <Link href={`/photos/${photo.id}`}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </Link>
            </div>
          ))}
        </SimpleGrid>
        <Group justify="center">
          <Button disabled={currentPage === 1} onClick={handlePrevPage}>
            Previous
          </Button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
            Next
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
