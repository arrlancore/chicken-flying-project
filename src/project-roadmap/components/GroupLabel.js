const GroupLabel = ({ children, variant }) => {
  const variantColors = {
    primary: "text-primary bg-primary-surface border-primary-light",
    secondary: "text-secondary bg-secondary-surface border-secondary-light",
    danger: "text-danger bg-danger-surface border-danger-light",
    success: "text-success bg-success-surface border-success-light",
  };

  return (
    <div
      className={`text-xs leading-5 inline border-[1px]
                 border-solid px-2 py-0.5 rounded
                 ${variantColors[variant]}`}
    >
      {children}
    </div>
  );
};

export default GroupLabel;
