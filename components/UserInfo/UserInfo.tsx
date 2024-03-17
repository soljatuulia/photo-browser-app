interface UserInfoProps {
    totalPhotos: number;
    totalAlbums: number;
  }

export default function UserInfo({ totalPhotos, totalAlbums }: UserInfoProps) {
  return (
    <div>
      <p>Total Albums: {totalAlbums}</p>
      <p>Total Photos: {totalPhotos}</p>
    </div>
  );
}