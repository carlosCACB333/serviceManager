import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Heading,
  CloseButton,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HStack } from "@chakra-ui/layout";

interface Props {
  titleModal?: string;
  title?: string;
  onClick: () => void;
  desc?: string;
  type?: "close" | "button" | "icon";
  [x: string]: any;
}

const Confirm = ({
  titleModal = "Alerta",
  title = "",
  desc = "Esta acción es irrebercible. ¿Deseas continuar?",
  type = "button",
  onClick,

  ...rest
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      {type === "button" && (
        <Button onClick={onOpen} {...rest}>
          {title}
        </Button>
      )}
      {type === "close" && <CloseButton onClick={onOpen} {...rest} />}

      {type === "icon" && (
        <IconButton aria-label="update" {...rest} onClick={onOpen} />
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        // isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titleModal}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack align="center">
              <AiOutlineExclamationCircle size="50" color="" />
              <Heading size="sm">{desc}</Heading>
            </HStack>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button
              colorScheme="blue"
              onClick={() => {
                onClick();
                onClose();
              }}
            >
              Confirmar
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Confirm;
