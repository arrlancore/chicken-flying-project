import Header from "../base-components/Header";
import { ReactComponent as CheckList } from "../assets/icon/checklist.svg";
import { ReactComponent as MoreHorizontalIcon } from "../assets/icon/more-horizontal.svg";
import GroupCard from "./components/GroupCard";
import GroupLabel from "./components/GroupLabel";
import ItemCard from "./components/ItemCard";
import Progress from "../base-components/Progress";
import PopoverCustom from "../base-components/PopoverCustom";
import MenuItem from "./components/MenuItem";
import Modal from "../base-components/Modal";

const cardData = [
  {
    groupTitle: "Group 1",
    period: "January - March",
    items: [
      {
        title: "Create New Campaign",
        progress: 80,
      },
      {
        title: "Create New Landing Page",
        progress: 100,
      },
    ],
  },
  {
    groupTitle: "Group 2",
    period: "January - March",
    items: [
      {
        title: "Create New Campaign",
        progress: 80,
      },
      {
        title: "Create New Landing Page",
        progress: 100,
      },
    ],
  },
  {
    groupTitle: "Group 3",
    period: "January - March",
    items: [],
  },
  {
    groupTitle: "Group 4",
    period: "January - March",
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

export default function ProjectRoadmap() {
  return (
    <div className="relative bg-white font-sans">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-12">
        {/* header */}
        <Header signedIn={false} />

        {/* cards group */}
        <section id="form" className="mt-5">
          <div className="flex items-start flex-wrap gap-4 overflow-x-auto">
            {cardData.map((data, index) => (
              <div className="mb-4 flex-1 max-w-[326px] min-w-[326px]">
                <GroupCard variant={toVariant(index)}>
                  <GroupLabel variant={toVariant(index)}>
                    {data.groupTitle}
                  </GroupLabel>
                  <div className="h-3" />
                  <div className="text-xs leading-5 font-bold">
                    {data.period}
                  </div>
                  {data.items.map((item) => (
                    <>
                      <div className="h-3" />
                      <ItemCard>
                        <div className="text-sm leading-6 font-bold">
                          {item.title}
                        </div>
                        <div className="border-b-[#E0E0E0] border-b-[1px] border-dashed my-1" />
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Progress percentage={item.progress} />
                            <div className="ml-2">
                              {item.progress === 100 ? (
                                <CheckList />
                              ) : (
                                <span className="text-xs text-[#75757]">
                                  {item.progress + "%"}
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

        <Modal />

        {/* search form */}
        <section id="form" className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-4 min-w-[300px]">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                {"caption.jobDesc"}
              </label>
              <input
                className="shadow rounded-md appearance-none border h-[50px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder={`such as "ruby" or "java"`}
              />
            </div>

            <div className="mb-4 min-w-[300px]">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                {"caption.location"}
              </label>
              <input
                className="shadow rounded-md appearance-none border h-[50px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="city name, zip code, or other.."
              />
            </div>

            <div className="flex items-center justify-between md:justify-start">
              <div className="flex items-center mb-4">
                <input
                  id="fulltime"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="fulltime"
                  className="ml-2 text-sm font-medium text-gray-700 "
                >
                  {"caption.fulltimeOnly"}
                </label>
              </div>

              <button className="ml-8 min-w-[120px] h-[50px] inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-900">
                {1 ? <div className="button-loader" /> : null}
                {"caption.search"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
