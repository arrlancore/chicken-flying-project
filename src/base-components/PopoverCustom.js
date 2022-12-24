import { useState } from "react";
import { Popover } from "react-tiny-popover";
import useOnClickOutside from "../utils/use-click-outside";

const PopoverCustom = ({ children, content }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useOnClickOutside(PopoverCustom.id, () => setIsPopoverOpen(false));
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "top", "left", "right"]} // preferred positions by priority
      content={content}
      align="start"
    >
      <div
        id={PopoverCustom.id}
        onClick={(e) => {
          setIsPopoverOpen((prev) => !prev);
        }}
      >
        {children}
      </div>
    </Popover>
  );
};

PopoverCustom.id = "click-popover-id";

export default PopoverCustom;
