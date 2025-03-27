// app/admin/page.tsx (или pages/admin/index.tsx)
"use client";

import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ProductsAdmin from "@/components/Admin/Products";
import AdminsAdmin from "@/components/Admin/AdminsAdmin";

const AdminPage: React.FC = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const sidebarBg = useColorModeValue("white", "gray.700");

  // Состояние выбранного раздела
  const [selectedSection, setSelectedSection] = useState<string>("");

  const renderContent = () => {
    switch (selectedSection) {
      case "products":
        return <ProductsAdmin />;
      case "users":
        return <AdminsAdmin/>;
      default:
        return (
          <Text fontSize="md" color="gray.500">
            Выберите раздел в левой панели для управления.
          </Text>
        );
    }
  };

  return (
    <Flex minH="100vh" bg={bg} mt={20}>
      {/* Боковая панель */}
      <Box width={{ base: "full", md: "300px" }} bg={sidebarBg} p={6} boxShadow="md">
        <Heading as="h1" size="lg" mb={8} textAlign="center">
          Админка
        </Heading>
        <VStack spacing={4} align="stretch">
          <Button
            colorScheme="orange"
            variant="solid"
            width="100%"
            onClick={() => setSelectedSection("products")}
          >
            Управление товарами
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            width="100%"
            onClick={() => setSelectedSection("users")}
          >
            Управление пользователями
          </Button>
        </VStack>
      </Box>

      {/* Основная область */}
      <Box flex="1" p={10}>
        <Heading as="h2" size="xl" mb={4}>
          Добро пожаловать в админку!
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={8}>
          Выберите раздел в левой панели для управления.
        </Text>
        <Box p={8} borderWidth="1px" borderRadius="md" boxShadow="sm" bg="white">
          {renderContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminPage;
