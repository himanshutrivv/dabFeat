import { useState, useEffect } from "react";
import { UserPlus, Trash2, Search, Users } from "lucide-react";
import { useBusinessStore } from "@/store/business-store";
import { DeleteUserReq, User, UserResp } from "@/types/user";
import { appTheme as theme } from "@/styles/themes/appTheme";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderTop,
  CardTitle,
  FiltersContainer,
  Main,
  SearchContainer,
  SearchInput,
  Container,
  SearchIcon,
  StatusBadge,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from "./style";
import { AddUserModal } from "./add-user-modal";
import { srDeleteUser, srGetUsers } from "@/sources/users";
import { toast } from "@/components/common/toast";
import { useTranslation } from "react-i18next";
import { ApiResponseCommon } from "@/types/common";
import { DeleteUserModal } from "./delete-user-modal";
import React from "react";
import Loader, { TableLoader } from "../common/loader";
import Table, { TableColumn } from "../common/table";
import { TFunction } from "i18next";
import { Button } from "@/styles/styled";

const getUserManagementHeaders = (
  t: TFunction,
  readOnly: boolean
): TableColumn[] => {
  const headersArray = t("lblUserManagementTableHeaders", {
    returnObjects: true,
  }) as { key: string; label: string }[];

  return headersArray
    .filter(({ key }) => !(readOnly && key === "action"))
    .map(({ key, label }) => ({
      key,
      label,
    }));
};

export const UserManagement: React.FC = () => {
  const { selectedBusiness } = useBusinessStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { t } = useTranslation();
  const businessId = selectedBusiness?.bussId || "";
  const readOnly = selectedBusiness?.role === "READ_ONLY";

  const [columns, setColumns] = useState<Record<string, any>[]>([]);
  const header = getUserManagementHeaders(t, readOnly);

  const fetchUserData = () => {
    setIsRefreshing(true);

    srGetUsers(businessId)
      .then((resp: UserResp) => {
        setUsers(resp?.users);
      })
      .catch((err: any) => toast.error(err.errorMsg))
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const deleteUser = (req: DeleteUserReq) => {
    srDeleteUser({ bussId: businessId, req })
      .then((resp: ApiResponseCommon) => {
        toast.success(resp?.respMessage);
        fetchUserData();
      })
      .catch((err: any) => toast.error(err.errorMsg))
      .finally(() => {
        setUserToDelete(null);
        setIsDeleting(false);
      });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user?.userName} ${user?.email} ${user?.mobile}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  useEffect(() => {
    if (!businessId) return;
    fetchUserData();
  }, [businessId]);

  useEffect(() => {
    const columnList = filteredUsers?.map((user) => ({
      user: user?.userName,
      mobile: user?.mobile,
      status: (
        <StatusBadge status={user?.status}>
          {user?.status === "active" ? "Active" : "Inactive"}
        </StatusBadge>
      ),
      created: formatDate(user?.createdAt),
      action: (
        <div style={{ paddingLeft: "10px" }}>
          <Trash2
            color="#e70d0d"
            size="18px"
            onClick={() => handleDeleteUser(user)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    }));

    setColumns(columnList);
  }, [filteredUsers, setColumns]);

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setIsDeleting(true);
      deleteUser({ userId: userToDelete?.email });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderEmptyState = () => (
    <EmptyState theme={theme}>
      <EmptyIcon theme={theme}>
        <Users size={48} />
      </EmptyIcon>
      <EmptyTitle theme={theme}>{t("lblNoUsers")}</EmptyTitle>
      <EmptyDescription theme={theme}>
        {searchTerm ? t("lblAdjSearchCriteria") : t("lblNoUser")}
      </EmptyDescription>
      {!readOnly && (
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus size={16} />
          {t("lblAddUser")}
        </Button>
      )}
    </EmptyState>
  );

  if (isLoading) {
    return <Loader size="md" />;
  }

  return (
    <Container>
      <Main>
        <Card>
          {isRefreshing ? (
            <Loader isComponentLoader />
          ) : (
            <>
              <CardHeader>
                <CardHeaderTop>
                  <div>
                    <CardTitle>{t("lblUserDirectory")}</CardTitle>
                    <CardDescription>{t("lblSearchUsersDesc")}</CardDescription>
                  </div>
                  {!readOnly && (
                    <Button
                      variant="primary"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      <UserPlus size={16} />
                      <span>{t("lblAddUser")}</span>
                    </Button>
                  )}
                </CardHeaderTop>
              </CardHeader>
              <CardContent>
                <FiltersContainer>
                  <SearchContainer>
                    <SearchIcon>
                      <Search size={16} />
                    </SearchIcon>
                    <SearchInput
                      type="text"
                      placeholder={t("lblSearchUsersPlaceholder")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </SearchContainer>
                </FiltersContainer>
              </CardContent>
            </>
          )}
        </Card>

        <Card>
          {isRefreshing ? (
            <TableLoader />
          ) : (
            <Table
              columns={header}
              data={columns}
              showPagination={false}
              noData={renderEmptyState()}
            />
          )}
        </Card>
      </Main>

      <AddUserModal
        bussId={businessId}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={() => {
          fetchUserData();
        }}
      />

      <DeleteUserModal
        user={userToDelete}
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirmDelete={confirmDelete}
        deleting={isDeleting}
      />
    </Container>
  );
};
