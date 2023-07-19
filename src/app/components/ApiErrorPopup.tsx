import { FC } from "react";

interface ApiErrorPopupProps {
  closeModal: () => void;
}

const ApiErrorPopup: FC<ApiErrorPopupProps> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">VIRUS</h2>
        <p>YOUR COMPUTER IS TOTALLY INFECTED</p>
        <button
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApiErrorPopup;
