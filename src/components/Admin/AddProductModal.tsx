"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";

export interface AddProductData {
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
  // Файл для загрузки изображения
  file?: File;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // Состояния для полей формы
  const [title, setTitle] = useState("");
  const [saleBadge, setSaleBadge] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [composition, setComposition] = useState("");
  const [packaging, setPackaging] = useState("");
  const [color, setColor] = useState("");
  const [dimension, setDimension] = useState("");
  const [consistency, setConsistency] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setErrorMessage(undefined);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("saleBadge", saleBadge);
    formData.append("netWeight", netWeight);
    formData.append("price", price);
    if (oldPrice) {
      formData.append("oldPrice", oldPrice);
    }
    formData.append("composition", composition);
    formData.append("packaging", packaging);
    formData.append("color", color);
    formData.append("dimension", dimension);
    formData.append("consistency", consistency);
    formData.append("shelfLife", shelfLife);
    if (file) {
      formData.append("file", file); // Важно: атрибут name "file" должен совпадать с FileInterceptor('file')
    }

    try {
      const res = await fetch("https://fish-back.onrender.com/products", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Ошибка при создании товара");
      toast({
        title: "Товар добавлен",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSuccess();
      onClose();
      // Очистка полей
      setTitle("");
      setSaleBadge("");
      setNetWeight("");
      setPrice("");
      setOldPrice("");
      setComposition("");
      setPackaging("");
      setColor("");
      setDimension("");
      setConsistency("");
      setShelfLife("");
      setFile(null);
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
      setErrorMessage("Не удалось добавить товар");
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsSaving(false);
  };

  // При закрытии модалки сбрасываем поля
  const handleClose = () => {
    setTitle("");
    setSaleBadge("");
    setNetWeight("");
    setPrice("");
    setOldPrice("");
    setComposition("");
    setPackaging("");
    setColor("");
    setDimension("");
    setConsistency("");
    setShelfLife("");
    setFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить новый товар</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {errorMessage && (
            <Box mb={4} p={3} bg="red.50" borderRadius="md">
              <Text color="red.600" fontSize="sm">
                {errorMessage}
              </Text>
            </Box>
          )}
          <FormControl mb={4} isRequired>
            <FormLabel>Изображение</FormLabel>
            {/* Добавляем атрибут name="file" */}
            <Input type="file" name="file" accept="image/*" onChange={handleFileChange} />
            {file && (
              <Text mt={1} fontSize="sm" color="gray.500">
                Выбран файл: {file.name}
              </Text>
            )}
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Название</FormLabel>
            <Input placeholder="Введите название товара" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Sale Badge (Акция)</FormLabel>
            <Input placeholder="Например, АКЦИЯ 1+1=3" value={saleBadge} onChange={(e) => setSaleBadge(e.target.value)} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Вес нетто</FormLabel>
            <Input placeholder="Например, 0.5 кг" value={netWeight} onChange={(e) => setNetWeight(e.target.value)} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Цена (руб.)</FormLabel>
            <Input type="number" placeholder="Введите цену" value={price} onChange={(e) => setPrice(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Старая цена (руб.)</FormLabel>
            <Input type="number" placeholder="Введите старую цену (если есть)" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Состав</FormLabel>
            <Textarea placeholder="Состав: икра горбуши, соль, масло..." value={composition} onChange={(e) => setComposition(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Тара</FormLabel>
            <Input placeholder="Например, стекло" value={packaging} onChange={(e) => setPackaging(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Цвет</FormLabel>
            <Input placeholder="Например, ярко-оранжевый" value={color} onChange={(e) => setColor(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Размер икринок</FormLabel>
            <Input placeholder="Например, 4 мм в диаметре" value={dimension} onChange={(e) => setDimension(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Консистенция</FormLabel>
            <Input placeholder="Например, сухая, не более 5-7% жидкости" value={consistency} onChange={(e) => setConsistency(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Срок годности</FormLabel>
            <Input placeholder="Например, 4 месяца в закрытом виде" value={shelfLife} onChange={(e) => setShelfLife(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleClose} isDisabled={isSaving}>
            Отмена
          </Button>
          <Button colorScheme="green" onClick={handleSubmit} isLoading={isSaving} loadingText="Добавление...">
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
