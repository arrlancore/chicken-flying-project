import Header from "../base-components/Header";

import AuthModal from "./components/AuthModal";
import FormTaskModal from "./components/FormTaskModal";
import DeleteTaskModal from "./components/DeleteTaskModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  createTodo,
  deleteItem,
  updateItem,
} from "./store/todo/todoAction";
import AddGroupModal from "./components/AddGroupModal";
import ProjectRoadmapMain from "./components/ProjectRoadmapMain";

const [userAuthModal, formTaskModal, deleteTaskModal, addGroupModal] = [
  "userAuthModal",
  "formTaskModal",
  "deleteTaskModal",
  "addGroupModal",
];
function renderProjectRoadmapModal(state, props = {}) {
  switch (state) {
    case userAuthModal:
      return <AuthModal {...props} />;
    case formTaskModal:
      return <FormTaskModal {...props} />;
    case deleteTaskModal:
      return <DeleteTaskModal {...props} />;
    case addGroupModal:
      return <AddGroupModal {...props} />;
    default:
      return null;
  }
}

const createModalConfig = (setModal, todo, dispatch) => {
  const noModal = { state: "", props: { open: false } };
  return {
    noModal,
    userAuthModal: {
      open: true,
      onCancel: () => setModal(noModal),
    },
    deleteTaskModal: {
      todoId: null,
      itemId: null,
      open: true,
      isEdit: false,
      onCancel: () => setModal(noModal),
      onSubmit: (payload) => dispatch(deleteItem(payload)),
      loading: todo.loading,
    },
    formTaskModal: {
      todoId: null,
      itemId: null,
      defaultValue: {},
      isEdit: false,
      open: true,
      onCancel: () => setModal(noModal),
      onSubmit: (isEdit, payload) => {
        console.log("isEdit", payload);

        dispatch(isEdit ? updateItem(payload) : createItem(payload));
      },
      loading: todo.loading,
    },
    addGroupModal: {
      open: true,
      onCancel: () => setModal(noModal),
      onSubmit: (payload) => dispatch(createTodo(payload)),
      loading: todo.loading,
    },
  };
};

export default function ProjectRoadmap() {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState({ state: "", props: {} });
  const modalConfig = createModalConfig(setModal, todo, dispatch);

  useEffect(() => {
    if (user.isLoggedIn) {
      if (modal.state === userAuthModal) {
        setModal(modalConfig.noModal);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (todo.createTodoSuccess || todo.createItemSuccess) {
      setModal(modalConfig.noModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo.createTodoSuccess, todo.createItemSuccess]);

  const handleCreateNewTask = (todoId) => {
    setModal({
      state: formTaskModal,
      props: { ...modalConfig.formTaskModal, todoId },
    });
  };

  console.log(123, modal);

  return (
    <div className="relative bg-white font-sans">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-12">
        {/* header */}
        <Header
          onClickSignIn={() =>
            setModal({
              state: userAuthModal,
              props: modalConfig.userAuthModal,
            })
          }
          onClickNewGroup={() =>
            setModal({
              state: addGroupModal,
              props: modalConfig.addGroupModal,
            })
          }
          signedIn={user.isLoggedIn}
        />

        {/* cards group */}
        {renderProjectRoadmapModal(modal.state, modal.props)}
        <ProjectRoadmapMain onCreateNewTask={handleCreateNewTask} />
      </div>
    </div>
  );
}
