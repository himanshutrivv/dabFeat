import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Form, FormGroup, FormRow, Input, Label } from "./style";
import { useTranslation } from "react-i18next";
import { AddUserReq } from "@/types/user";
import { srAddUser } from "@/sources/users";
import { ApiResponseCommon } from "@/types/common";
import { toast } from "@/components/common/toast";
import Modal from "../common/modal";
import { ErrorMessage } from "@/styles/styled";

interface AddUserModalProps {
  bussId: string;
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export function AddUserModal({
  bussId,
  isOpen,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    status: "active" as const,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [adding, setAdding] = useState<boolean>(false);

  const { t } = useTranslation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      status: "active",
    });
    setErrors({});
  };

  const addUser = (req: AddUserReq) => {
    srAddUser({ bussId, req })
      .then((resp: ApiResponseCommon) => {
        toast.success(resp?.respMessage);
        onUserAdded();
        onClose();
        resetForm();
      })
      .catch((err: any) => toast.error(err.errorMsg))
      .finally(() => setAdding(false));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setAdding(true);

    const user: AddUserReq = {
      userName: formData?.firstName + " " + formData?.lastName,
      email: formData?.email,
      mobile: formData?.mobile,
    };

    addUser(user);
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      status: "active",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      size="md"
      closable={!adding}
      header={{
        title: t("lblAddNewUser"),
        icon: <UserPlus />,
      }}
      footer={{
        divider: true,
        horizontalAlign: "space-between",
        primaryButton: {
          children: adding ? t("lblAddingUser") : t("lblAddUser"),
          loading: adding,
          onClick: handleSubmit,
        },
        secondaryButton: {
          children: t("lblCancel"),
          disabled: adding,
          onClick: handleCancel,
        },
      }}
    >
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">{t("lblFirstName")}</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              hasError={!!errors.firstName}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">{t("lblLastName")}</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              hasError={!!errors.lastName}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="email">{t("lblEmail")}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            hasError={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="mobile">{t("lblMobile")}</Label>
          <Input
            id="mobile"
            type="tel"
            placeholder="+911234567890"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            hasError={!!errors.mobile}
          />
          {errors.mobile && <ErrorMessage>{errors.mobile}</ErrorMessage>}
        </FormGroup>
      </Form>
    </Modal>
  );
}
