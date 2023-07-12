interface LoadButtonProps {
  nextPage: () => void;
  disabled: boolean;
}

const LoadButton = ({ nextPage, disabled }: LoadButtonProps) => {
  return (
    <button
      className={
        !disabled
          ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          : "bg-blue-200 text-white font-bold py-2 px-4 rounded-full"
      }
      onClick={nextPage}
      disabled={disabled}
    >
      {!disabled ? " Load More" : "No more!"}
    </button>
  );
};

export default LoadButton;
