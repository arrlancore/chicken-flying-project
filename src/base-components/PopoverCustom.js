import { useState } from "react";
import { Popover } from "react-tiny-popover";

const PopoverCustom = ({ children, content }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onClose = () => setIsPopoverOpen(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "top", "left", "right"]} // preferred positions by priority
      content={content(onClose)}
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
