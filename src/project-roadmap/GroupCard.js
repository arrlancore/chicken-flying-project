const GroupCard = ({ children, variant }) => {
  const variantColors = {
    primary: "bg-primary-surface border-primary-light",
    secondary: "bg-secondary-surface border-secondary-light",
    danger: "bg-danger-surface border-danger-light",
    success: "bg-success-surface border-success-light",
  };

  return (
    <div
      className={`p-4 rounded
                border-[1px] border-solid
                ${variantColors[variant]}`}
    >
      {children}
    </div>
  );
};

export default GroupCard;
