import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { User } from "@/types/user";
import Modal from "../common/modal";
import { DeleteModalContent, DeleteModalDescription } from "./style";

interface DeleteUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  deleting: boolean;
}

export function DeleteUserModal({
  user,
  isOpen,
  deleting = false,
  onClose,
  onConfirmDelete,
}: DeleteUserModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={{
        title: t("lblDeleteUser"),
        icon: <AlertTriangle size={20} color="#ef4444" />,
      }}
      footer={{
        primaryButton: {
          loading: deleting,
          children: deleting ? t("lblDeleting") : t("lblDeleteUser"),
          onClick: onConfirmDelete,
        },
        secondaryButton: {
          disabled: deleting,
          children: t("lblCancel"),
          onClick: onClose,
        },
      }}
      size="sm"
      closable={!deleting}
    >
      <DeleteModalContent>
        <DeleteModalDescription>
          {t("lblDeleteUserTitle")} <strong>{user?.userName}</strong>?<br />
        </DeleteModalDescription>
      </DeleteModalContent>
    </Modal>
  );
}
