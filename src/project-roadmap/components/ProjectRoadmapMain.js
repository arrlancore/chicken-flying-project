import { ReactComponent as CheckList } from "../../assets/icon/checklist.svg";
import { ReactComponent as MoreHorizontalIcon } from "../../assets/icon/more-horizontal.svg";
import { ReactComponent as PlusCircleIcon } from "../../assets/icon/plus-circle.svg";
import GroupCard from "./GroupCard";
import GroupLabel from "./GroupLabel";
import ItemCard from "./ItemCard";
import Progress from "../../base-components/Progress";
import PopoverCustom from "../../base-components/PopoverCustom";
import MenuItem from "./MenuItem";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderIf } from "../../utils";
import { getTodoWithItem } from "../store/todo/todoAction";

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

const caption = {
  noTask: "No Task",
  createNewTask: "Create New Task",
};

const ProjectRoadmapMain = ({ onCreateNewTask, onEditTask }) => {
  const todo = useSelector((state) => state.todo);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getTodoWithItem());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn]);

  return renderIf(user.isLoggedIn)(
    <section id="form" className="mt-5">
      <div className="flex items-start flex-wrap gap-4 overflow-x-auto">
        {todo.todos?.map((data, indexTodo) => (
          <div
            key={indexTodo}
            className="mb-4 flex-1 max-w-[326px] min-w-[326px]"
          >
            <GroupCard variant={toVariant(indexTodo)}>
              <GroupLabel variant={toVariant(indexTodo)}>
                {data.title}
              </GroupLabel>
              <div className="h-3" />
              <div className="text-xs leading-5 font-bold">
                {data.description}
              </div>
              {data.items.length ? (
                data.items.map((item, index) => (
                  <Fragment key={index}>
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

                        <PopoverCustom
                          content={
                            <MenuItem
                              hideLeft={indexTodo === 0}
                              hideRight={indexTodo === todo.todos.length - 1}
                            />
                          }
                        >
                          <MoreHorizontalIcon
                            id={PopoverCustom.id}
                            className="hover:bg-[#EDEDED] hover:rounded cursor-pointer"
                          />
                        </PopoverCustom>
                      </div>
                    </ItemCard>
                  </Fragment>
                ))
              ) : (
                <>
                  <div className="h-3" />
                  <ItemCard>
                    <span className="text-sm leading-6 text-[#757575]">
                      {caption.noTask}
                    </span>
                  </ItemCard>
                  <div className="h-3" />
                  <div
                    className="flex cursor-pointer"
                    onClick={() => onCreateNewTask(data.id)}
                  >
                    <PlusCircleIcon />
                    <div className="text-xs leading-5 ml-2">
                      {caption.createNewTask}
                    </div>
                  </div>
                </>
              )}
            </GroupCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectRoadmapMain;
