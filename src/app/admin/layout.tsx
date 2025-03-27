import { ChakraProvider } from '@chakra-ui/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Админка',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
