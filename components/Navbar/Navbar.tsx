import { Text, Title } from '@mantine/core';

import classes from './Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header>
      <Title className={classes.title} order={1} ta="left">
        <Link href="/" className={classes.link}>
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'purple', to: 'pink' }}
          >
            Photo Browser
          </Text>
        </Link>
      </Title>
    </header>
  );
};

export default Navbar;
