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
  InputGroup,
  InputRightElement,
  Box,
  Text,
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSave принимает имя и пароль
  onSave: (username: string, password: string) => void;
  isSaving?: boolean;
  errorMessage?: string;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
  errorMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSave = () => {
    onSave(username, password);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создать администратора</ModalHeader>
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
            <FormLabel>Имя пользователя</FormLabel>
            <Input
              placeholder="Введите имя администратора"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Пароль</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Введите пароль"
                value={password}
                onChange={handlePasswordChange}
              />
              <InputRightElement width="3rem">
                <Button h="1.5rem" size="sm" onClick={handleTogglePassword}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} isDisabled={isSaving}>
            Отмена
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={isSaving}
            loadingText="Сохранение..."
          >
            Создать
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAdminModal;
