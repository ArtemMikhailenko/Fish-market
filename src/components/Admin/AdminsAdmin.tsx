"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search as SearchIcon } from "lucide-react";
import NextLink from "next/link";
import CreateAdminModal from "./CreateAdminModal";

interface AdminUser {
  id: number | string;
  username: string;
  password: string;
  // другие поля, если есть
}

const AdminsAdmin: React.FC = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [filtered, setFiltered] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: string]: boolean }>({});
  const toast = useToast();

  // Загрузка списка админов
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // Замените URL на реальный, например: http://localhost:3000/admin/all
      const res = await fetch("https://fish-back.onrender.com/admin/all");
      if (!res.ok) throw new Error("Ошибка загрузки админов");
      const data = await res.json();
      setAdmins(data);
      setFiltered(data);
    } catch (error) {
      console.error("Ошибка при загрузке админов:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить админов",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value) {
      setFiltered(admins);
      return;
    }
    const lower = value.toLowerCase();
    const filteredData = admins.filter((adm) =>
      adm.username.toLowerCase().includes(lower)
    );
    setFiltered(filteredData);
  };

  // Удаление админа
  const handleDelete = async (id: number | string) => {
    try {
      const res = await fetch(`https://fish-back.onrender.com/admin/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast({
        title: "Админ удалён",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAdmins();
    } catch (error) {
      console.error("Ошибка при удалении админа:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить админа",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const togglePasswordVisibility = (id: number | string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Обработчик создания нового админа
  const handleCreateAdmin = async (username: string, password: string) => {
    try {
      const body = { username, password };
      const res = await fetch("https://fish-back.onrender.com/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Ошибка создания админа");
      toast({
        title: "Админ создан",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAdmins();
    } catch (error) {
      console.error("Ошибка при создании админа:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать админа",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsAddModalOpen(false);
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Управление администраторами</Heading>
        <Button colorScheme="green" onClick={() => setIsAddModalOpen(true)}>
          Добавить админа
        </Button>
      </Flex>

      <Flex mb={4} maxW="400px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon size={18} color="#A0AEC0" />
          </InputLeftElement>
          <Input
            placeholder="Поиск по username"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
      </Flex>

      {loading ? (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Пароль</Th>
              <Th>Действия</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((adm) => (
              <Tr key={adm.id}>
                <Td>{adm.id}</Td>
                <Td>{adm.username}</Td>
                <Td>
                  {visiblePasswords[adm.id] ? adm.password : "••••••••"}
                  <Button size="xs" ml={2} onClick={() => togglePasswordVisibility(adm.id)}>
                    {visiblePasswords[adm.id] ? "Скрыть" : "Показать"}
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(adm.id)}>
                    Удалить
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <CreateAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreateAdmin}
      />
    </Box>
  );
};

export default AdminsAdmin;
