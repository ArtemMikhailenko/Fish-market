"use client";

import React, { ChangeEvent } from "react";
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
} from "@chakra-ui/react";

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

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;

  // Значения для всех полей
  editTitle: string;
  setEditTitle: (val: string) => void;

  editSaleBadge: string;
  setEditSaleBadge: (val: string) => void;

  editNetWeight: string;
  setEditNetWeight: (val: string) => void;

  editPrice: number;
  setEditPrice: (val: number) => void;

  editOldPrice?: number;
  setEditOldPrice: (val?: number) => void;

  editComposition: string;
  setEditComposition: (val: string) => void;

  editPackaging: string;
  setEditPackaging: (val: string) => void;

  editColor: string;
  setEditColor: (val: string) => void;

  editDimension: string;
  setEditDimension: (val: string) => void;

  editConsistency: string;
  setEditConsistency: (val: string) => void;

  editShelfLife: string;
  setEditShelfLife: (val: string) => void;

  // Поле для файла (изображения)
  editImageFile: File | null;
  setEditImageFile: (file: File | null) => void;

  // Управление процессом сохранения и ошибками
  isSaving: boolean;
  errorMessage?: string;

  onSave: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  editTitle,
  setEditTitle,
  editSaleBadge,
  setEditSaleBadge,
  editNetWeight,
  setEditNetWeight,
  editPrice,
  setEditPrice,
  editOldPrice,
  setEditOldPrice,
  editComposition,
  setEditComposition,
  editPackaging,
  setEditPackaging,
  editColor,
  setEditColor,
  editDimension,
  setEditDimension,
  editConsistency,
  setEditConsistency,
  editShelfLife,
  setEditShelfLife,
  editImageFile,
  setEditImageFile,
  isSaving,
  errorMessage,
  onSave,
}) => {
  // Обработчик выбора файла
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImageFile(e.target.files[0]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактировать товар</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Отображение ошибки, если есть */}
          {errorMessage && (
            <Box mb={4} p={3} bg="red.50" borderRadius="md">
              <Text color="red.600" fontSize="sm">
                {errorMessage}
              </Text>
            </Box>
          )}

          <FormControl mb={4}>
            <FormLabel>Изображение</FormLabel>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {editImageFile && (
              <Text mt={1} fontSize="sm" color="gray.500">
                Выбран файл: {editImageFile.name}
              </Text>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Название</FormLabel>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Sale Badge (Акция)</FormLabel>
            <Input
              placeholder="Например, АКЦИЯ 1+1=3"
              value={editSaleBadge}
              onChange={(e) => setEditSaleBadge(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Вес нетто</FormLabel>
            <Input
              value={editNetWeight}
              onChange={(e) => setEditNetWeight(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Цена (руб.)</FormLabel>
            <Input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Старая цена (руб.)</FormLabel>
            <Input
              type="number"
              value={editOldPrice ?? ""}
              onChange={(e) =>
                setEditOldPrice(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Состав</FormLabel>
            <Textarea
              placeholder="Состав: икра горбуши, соль, масло..."
              value={editComposition}
              onChange={(e) => setEditComposition(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Тара</FormLabel>
            <Input
              placeholder="Например, стекло"
              value={editPackaging}
              onChange={(e) => setEditPackaging(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Цвет</FormLabel>
            <Input
              placeholder="Например, ярко-оранжевый"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Размер икринок</FormLabel>
            <Input
              placeholder="Например, 4 мм в диаметре"
              value={editDimension}
              onChange={(e) => setEditDimension(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Консистенция</FormLabel>
            <Input
              placeholder="Например, сухая, не более 5-7% жидкости"
              value={editConsistency}
              onChange={(e) => setEditConsistency(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Срок годности</FormLabel>
            <Input
              placeholder="Например, 4 месяца в закрытом виде"
              value={editShelfLife}
              onChange={(e) => setEditShelfLife(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} isDisabled={isSaving}>
            Отмена
          </Button>
          <Button
            colorScheme="blue"
            onClick={onSave}
            isLoading={isSaving}
            loadingText="Сохранение..."
          >
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
