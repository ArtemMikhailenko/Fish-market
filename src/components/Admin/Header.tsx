// Пример Header.tsx с использованием Chakra UI
import { Flex, Box, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <Flex as="header" p={4} bg="white" shadow="md" justify="space-between" align="center">
      <Box fontWeight="bold">MySite Logo</Box>
      <Flex gap={4}>
        <NextLink href="/catalog" passHref>
          <Link>Каталог</Link>
        </NextLink>
        <NextLink href="/admin" passHref>
          <Button variant="outline" size="sm">Админка</Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Header;
