import React from "react";
import Button from "../../base-components/Button";
import Modal from "../../base-components/Modal";
import { ReactComponent as ExclamationIcon } from "../../assets/icon/exclamation.svg";
import { renderIf } from "../../utils";

const caption = {
  title: "Delete Task",
  description:
    "Are you sure want to delete this task? your action can’t be reverted.",
  cancel: "Cancel",
  delete: "Delete",
};

const DeleteTaskModal = ({
  open,
  onCancel,
  onDelete,
  loading,
  todoId,
  itemId,
  error,
}) => {
  return (
    <Modal
      onClose={loading ? () => {} : onCancel}
      open={open}
      title={
        <span className="flex items-center">
          <ExclamationIcon className="mr-3" /> {caption.title}
        </span>
      }
      content={
        <>
          <div className="text-sm leading-6">{caption.description}</div>
          {renderIf(error)(
            <div>
              <div className="h-3" />
              <small className="text-danger">{error}</small>
            </div>
          )}
        </>
      }
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button onClick={onCancel} disabled={loading}>
            {caption.cancel}
          </Button>
          <Button
            onClick={() => {
              onDelete({ todoId, itemId });
              onCancel();
            }}
            loading={loading}
            disabled={loading}
            variant="danger"
          >
            {caption.delete}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteTaskModal;
