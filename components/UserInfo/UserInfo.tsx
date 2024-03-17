import { Title } from '@mantine/core';

import classes from './UserInfo.module.css';

interface UserInfoProps {
	totalPhotos: number | null | undefined;
	totalAlbums: number | null | undefined;
}

export default function UserInfo({ totalPhotos, totalAlbums }: UserInfoProps) {
	if (totalPhotos === null || totalPhotos === undefined || typeof totalPhotos !== 'number') {
		totalPhotos = 0;
	}

	if (totalAlbums === null || totalAlbums === undefined || typeof totalAlbums !== 'number') {
		totalAlbums = 0;
	}

	return (
		<div className={classes.container}>
			<Title order={4}>Fun facts about user</Title>
			<p>Total Albums: {totalAlbums}</p>
			<p>Total Photos: {totalPhotos}</p>
		</div>
	);
}