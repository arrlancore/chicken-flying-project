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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, deleteItem, updateItem } from "./store/todo/todoAction";
import { renderIf } from "../utils";

const cardData = [
  {
    title: "Group 1",
    description: "January - March",
    items: [
      {
        name: "Create New Campaign",
        progress_percentage: 80,
      },
      {
        name: "Create New Landing Page",
        progress_percentage: 100,
      },
    ],
  },
  {
    title: "Group 2",
    description: "January - March",
    items: [
      {
        name: "Create New Campaign",
        progress_percentage: 80,
      },
      {
        name: "Create New Landing Page",
        progress_percentage: 100,
      },
    ],
  },
  {
    title: "Group 3",
    description: "January - March",
    items: [],
  },
  {
    title: "Group 4",
    description: "January - March",
    items: [],
  },
];

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

function renderProjectRoadmapModal(state, props = {}) {
  const [userAuthModal, formTaskModal, deleteTaskModal] = [
    "userAuthModal",
    "formTaskModal",
    "deleteTaskModal",
  ];

  switch (state) {
    case userAuthModal:
      return <AuthModal {...props} />;
    case formTaskModal:
      return <FormTaskModal {...props} />;
    case deleteTaskModal:
      return <DeleteTaskModal {...props} />;
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
  };
};

export default function ProjectRoadmap() {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState({ state: "", props: {} });
  const modalConfig = createModalConfig(setModal, todo, dispatch);
  console.log(modal);

  useEffect(() => {
    if (user.isLoggedIn) {
      setModal(modalConfig.noModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn]);

  return (
    <div className="relative bg-white font-sans">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-12">
        {/* header */}
        <Header
          onClickSignIn={() =>
            setModal({
              state: "userAuthModal",
              props: modalConfig.userAuthModal,
            })
          }
          signedIn={user.isLoggedIn}
        />

        {/* cards group */}
        {renderProjectRoadmapModal(modal.state, modal.props)}
        {renderIf(user.isLoggedIn)(
          <section id="form" className="mt-5">
            <div className="flex items-start flex-wrap gap-4 overflow-x-auto">
              {cardData.map((data, index) => (
                <div className="mb-4 flex-1 max-w-[326px] min-w-[326px]">
                  <GroupCard variant={toVariant(index)}>
                    <GroupLabel variant={toVariant(index)}>
                      {data.title}
                    </GroupLabel>
                    <div className="h-3" />
                    <div className="text-xs leading-5 font-bold">
                      {data.description}
                    </div>
                    {data.items.map((item) => (
                      <>
                        <div className="h-3" />
                        <ItemCard>
                          <div className="text-sm leading-6 font-bold">
                            {item.name}
                          </div>
                          <div className="border-b-[#E0E0E0] border-b-[1px] border-dashed my-1" />
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Progress percentage={item.progress_percentage} />
                              <div className="ml-2">
                                {item.progress_percentage === 100 ? (
                                  <CheckList />
                                ) : (
                                  <span className="text-xs text-[#75757]">
                                    {item.progress_percentage + "%"}
                                  </span>
                                )}
                              </div>
                            </div>

                            <PopoverCustom content={<MenuItem />}>
                              <MoreHorizontalIcon
                                id={PopoverCustom.id}
                                className="hover:bg-[#EDEDED] hover:rounded cursor-pointer"
                              />
                            </PopoverCustom>
                          </div>
                        </ItemCard>
                      </>
                    ))}
                  </GroupCard>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
