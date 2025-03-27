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
import EditProductModal from "./EditProductModal";
import AddProductModal from "./AddProductModal";

interface Product {
  _id: string;
  title: string;
  saleBadge?: string;
  netWeight: string;
  price: number;
  oldPrice?: number;
  composition?: string;
  packaging?: string;
  color?: string;
  dimension?: string;
  consistency?: string;
  shelfLife?: string;
  image?: string;
}

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Состояния для модалки редактирования
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Поля для редактирования
  const [editTitle, setEditTitle] = useState("");
  const [editSaleBadge, setEditSaleBadge] = useState("");
  const [editNetWeight, setEditNetWeight] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOldPrice, setEditOldPrice] = useState<number | undefined>(undefined);
  const [editComposition, setEditComposition] = useState("");
  const [editPackaging, setEditPackaging] = useState("");
  const [editColor, setEditColor] = useState("");
  const [editDimension, setEditDimension] = useState("");
  const [editConsistency, setEditConsistency] = useState("");
  const [editShelfLife, setEditShelfLife] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Состояния для сохранения и ошибок
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const toast = useToast();
  const handleAddSuccess = () => {
    fetchProducts();
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Замените URL на реальный адрес вашего бэкенда
      const res = await fetch("https://fish-back.onrender.com/products");
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value) {
      setFiltered(products);
      return;
    }
    const lower = value.toLowerCase();
    const filteredData = products.filter((p) =>
      p.title.toLowerCase().includes(lower)
    );
    setFiltered(filteredData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`https://fish-back.onrender.com/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast({
        title: "Товар удалён",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setEditTitle(product.title);
    setEditSaleBadge(product.saleBadge || "");
    setEditNetWeight(product.netWeight);
    setEditPrice(product.price);
    setEditOldPrice(product.oldPrice);
    setEditComposition(product.composition || "");
    setEditPackaging(product.packaging || "");
    setEditColor(product.color || "");
    setEditDimension(product.dimension || "");
    setEditConsistency(product.consistency || "");
    setEditShelfLife(product.shelfLife || "");
    setEditImageFile(null);
    setIsModalOpen(true);
  };

  const saveChanges = async () => {
    if (!editProduct) return;
    setIsSaving(true);
    setErrorMessage(undefined);

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("saleBadge", editSaleBadge);
    formData.append("netWeight", editNetWeight);
    formData.append("price", String(editPrice));
    if (editOldPrice !== undefined) {
      formData.append("oldPrice", String(editOldPrice));
    }
    formData.append("composition", editComposition);
    formData.append("packaging", editPackaging);
    formData.append("color", editColor);
    formData.append("dimension", editDimension);
    formData.append("consistency", editConsistency);
    formData.append("shelfLife", editShelfLife);

    if (editImageFile) {
      formData.append("file", editImageFile);
    }

    try {
      const res = await fetch(`https://fish-back.onrender.com/products/${editProduct._id}`, {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Ошибка при обновлении");
      }
      toast({
        title: "Сохранено",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Ошибка при обновлении товара:", error);
      setErrorMessage("Не удалось сохранить изменения");
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить изменения",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsSaving(false);
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Управление товарами</Heading>
        <Button colorScheme="green" onClick={() => setIsAddModalOpen(true)}>
            Добавить товар
        </Button>
      </Flex>

      <Flex mb={4} maxW="400px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon size={18} color="#A0AEC0" />
          </InputLeftElement>
          <Input
            placeholder="Поиск по названию"
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
              <Th>Название</Th>
              <Th>Цена (руб.)</Th>
              <Th>Старая цена (руб.)</Th>
              <Th>Действия</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((product) => (
              <Tr key={product._id}>
                <Td>{product.title}</Td>
                <Td>{product.price} руб.</Td>
                <Td>{product.oldPrice ? `${product.oldPrice} руб.` : "-"}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => openEditModal(product)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Удалить
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editProduct}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editSaleBadge={editSaleBadge}
        setEditSaleBadge={setEditSaleBadge}
        editNetWeight={editNetWeight}
        setEditNetWeight={setEditNetWeight}
        editPrice={editPrice}
        setEditPrice={setEditPrice}
        editOldPrice={editOldPrice}
        setEditOldPrice={setEditOldPrice}
        editComposition={editComposition}
        setEditComposition={setEditComposition}
        editPackaging={editPackaging}
        setEditPackaging={setEditPackaging}
        editColor={editColor}
        setEditColor={setEditColor}
        editDimension={editDimension}
        setEditDimension={setEditDimension}
        editConsistency={editConsistency}
        setEditConsistency={setEditConsistency}
        editShelfLife={editShelfLife}
        setEditShelfLife={setEditShelfLife}
        editImageFile={editImageFile}
        setEditImageFile={setEditImageFile}
        isSaving={isSaving}
        errorMessage={errorMessage}
        onSave={saveChanges}
      />
      <AddProductModal
         isOpen={isAddModalOpen}
         onClose={() => setIsAddModalOpen(false)}
         onSuccess={handleAddSuccess}
      />
    </Box>
  );
};

export default ProductsAdmin;
