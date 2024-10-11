import classNames from "classnames";

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "w-full mx-auto text-left bg-white shadow border-blue-400 ring-gray-200 p-6 rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
