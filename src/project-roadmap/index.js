import Header from "../base-components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectRoadmapMainView from "./components/ProjectRoadmapMainView";
import ProjectRoadmapModal, {
  addGroupModal,
  deleteTaskModal,
  formTaskModal,
  useCloseModalOnSuccess,
  userAuthModal,
} from "./components/ProjectRoadmapModal";
import {
  createItem,
  createTodo,
  deleteItem,
  updateItem,
} from "./store/todo/todoAction";
import { logOut } from "./store/user/userSlice";
import SignInInstruction from "./components/SignInInstruction";
import { renderIf } from "../utils";

export default function ProjectRoadmap() {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const user = useSelector((state) => state.user);

  const [modal, setModal] = useState({ state: "", props: {} });
  const noModal = { state: "", props: { open: false } };
  const modalConfig = {
    noModal,
    userAuthModal: {
      open: true,
      onCancel: () => setModal(noModal),
    },
    deleteTaskModal: {
      error: todo.error,
      todoId: null,
      itemId: null,
      open: true,
      onCancel: () => setModal(noModal),
      onDelete: (payload) => dispatch(deleteItem(payload)),
      loading: todo.loading,
    },
    formTaskModal: {
      error: todo.error,
      todoId: null,
      itemId: null,
      defaultValue: {},
      isEdit: false,
      open: true,
      onCancel: () => setModal(noModal),
      onSubmit: (isEdit, payload) => {
        dispatch(
          isEdit
            ? updateItem({ ...payload, target_todo_id: payload.todoId })
            : createItem(payload)
        );
      },
      loading: todo.loading,
    },
    addGroupModal: {
      error: todo.error,
      open: true,
      onCancel: () => setModal(noModal),
      onSubmit: (payload) => dispatch(createTodo(payload)),
      loading: todo.loading,
    },
  };

  useCloseModalOnSuccess(todo, () => setModal(modalConfig.noModal));
  useEffect(() => {
    if (user.isLoggedIn) {
      if (modal.state === userAuthModal) {
        setModal(modalConfig.noModal);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn]);

  const handleCreateNewTask = (todoId) => {
    setModal({
      state: formTaskModal,
      props: { ...modalConfig.formTaskModal, todoId },
    });
  };

  const handleEditTask = (todoId, { id, name, progress_percentage }) => {
    setModal({
      state: formTaskModal,
      props: {
        ...modalConfig.formTaskModal,
        todoId,
        itemId: id,
        isEdit: true,
        defaultValue: { name, progress_percentage },
      },
    });
  };

  const handleMoveTask = (payload) => {
    dispatch(updateItem(payload));
  };

  const handleDeleteTask = (todoId, itemId) => {
    setModal({
      state: deleteTaskModal,
      props: {
        ...modalConfig.deleteTaskModal,
        todoId,
        itemId,
      },
    });
  };

  return (
    <div className="relative bg-white font-sans">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-12">
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
          onClickSignOut={() => {
            dispatch(logOut());
          }}
          signedIn={user.isLoggedIn}
        />
        <ProjectRoadmapModal state={modal.state} modalProps={modal.props} />
        <ProjectRoadmapMainView
          onCreateNewTask={handleCreateNewTask}
          onEditTask={handleEditTask}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
        {renderIf(user.isLoggedIn === false)(<SignInInstruction />)}
      </div>
    </div>
  );
}
