import React from "react";
import { ReactComponent as CloseIcon } from "../assets/icon/close.svg";
import { renderIf } from "../utils";

const Modal = ({ open, onClose, title, content, footer }) => {
  return renderIf(open)(
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[420px]">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg text-[#1D1F20]">{title}</h3>
                <CloseIcon
                  onClick={onClose}
                  className="m-1 cursor-pointer"
                  aria-label="close"
                />
              </div>
            </div>
            {/* content */}
            <div className="px-6 pb-4">{content}</div>
            {/* footer */}
            <div className="px-4 py-3 flex sm:px-6">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
