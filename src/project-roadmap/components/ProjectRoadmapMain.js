import { ReactComponent as CheckList } from "../../assets/icon/checklist.svg";
import { ReactComponent as MoreHorizontalIcon } from "../../assets/icon/more-horizontal.svg";
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

const ProjectRoadmapMain = () => {
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
        {todo.todos?.map((data, index) => (
          <div key={index} className="mb-4 flex-1 max-w-[326px] min-w-[326px]">
            <GroupCard variant={toVariant(index)}>
              <GroupLabel variant={toVariant(index)}>{data.title}</GroupLabel>
              <div className="h-3" />
              <div className="text-xs leading-5 font-bold">
                {data.description}
              </div>
              {data.items?.map((item, index) => (
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

                      <PopoverCustom content={<MenuItem />}>
                        <MoreHorizontalIcon
                          id={PopoverCustom.id}
                          className="hover:bg-[#EDEDED] hover:rounded cursor-pointer"
                        />
                      </PopoverCustom>
                    </div>
                  </ItemCard>
                </Fragment>
              ))}
            </GroupCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectRoadmapMain;
