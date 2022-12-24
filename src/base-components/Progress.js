import React from "react";

const Progress = ({ percentage }) => {
  const isCompleted = percentage === 100;
  const roundBarStyle = isCompleted ? "rounded-full" : "rounded-l-full";
  const roundBg = isCompleted ? "bg-success" : "bg-primary";

  return (
    <div class="w-[175px] bg-[#EDEDED] rounded-full h-4">
      <div
        class={`h-4 ${roundBarStyle} ${roundBg}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progress;
