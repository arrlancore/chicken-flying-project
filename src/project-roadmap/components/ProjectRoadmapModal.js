import React, { useEffect } from "react";
import AddGroupModal from "./AddGroupModal";
import AuthModal from "./AuthModal";
import DeleteTaskModal from "./DeleteTaskModal";
import FormTaskModal from "./FormTaskModal";

export const [userAuthModal, formTaskModal, deleteTaskModal, addGroupModal] = [
  "userAuthModal",
  "formTaskModal",
  "deleteTaskModal",
  "addGroupModal",
];

export const useCloseModalOnSuccess = (todo, closeModal) => {
  useEffect(() => {
    if (
      todo.createTodoSuccess ||
      todo.createItemSuccess ||
      todo.updateItemSuccess ||
      todo.deleteItemSuccess
    ) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    todo.createTodoSuccess,
    todo.createItemSuccess,
    todo.updateItemSuccess,
    todo.deleteItemSuccess,
  ]);
};

export default function ProjectRoadmapModal({ state, modalProps }) {
  switch (state) {
    case userAuthModal:
      return <AuthModal {...modalProps} />;
    case formTaskModal:
      return <FormTaskModal {...modalProps} />;
    case deleteTaskModal:
      return <DeleteTaskModal {...modalProps} />;
    case addGroupModal:
      return <AddGroupModal {...modalProps} />;
    default:
      return null;
  }
}
