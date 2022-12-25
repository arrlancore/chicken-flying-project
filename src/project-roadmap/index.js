import Header from "../base-components/Header";
import { ReactComponent as CheckList } from "../assets/icon/checklist.svg";
import { ReactComponent as MoreHorizontalIcon } from "../assets/icon/more-horizontal.svg";
import GroupCard from "./components/GroupCard";
import GroupLabel from "./components/GroupLabel";
import ItemCard from "./components/ItemCard";
import Progress from "../base-components/Progress";
import PopoverCustom from "../base-components/PopoverCustom";
import MenuItem from "./components/MenuItem";
import AuthModal from "./components/AuthModal";
import FormTaskModal from "./components/FormTaskModal";
import DeleteTaskModal from "./components/DeleteTaskModal";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  createTodo,
  deleteItem,
  getTodoWithItem,
  updateItem,
} from "./store/todo/todoAction";
import { renderIf } from "../utils";
import AddGroupModal from "./components/AddGroupModal";
import usePrevious from "../utils/use-previous";
import ProjectRoadmapMain from "./components/ProjectRoadmapMain";

const toVariant = (index) => {
  const value = (index + 1) % 4; // 4 total of variant
  switch (value) {
    case 1:
      return "primary";
    case 2:
      return "secondary";
    case 3:
      return "danger";
    default:
      return "success";
  }
};

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
      defaultValue: {},
      isEdit: false,
      open: true,
      onCancel: () => setModal(noModal),
      onSubmit: (isEdit, payload) =>
        dispatch(isEdit ? updateItem(payload) : createItem(payload)),
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
    setModal(modalConfig.noModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo.mapTodos]);

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
        <ProjectRoadmapMain />
      </div>
    </div>
  );
}
