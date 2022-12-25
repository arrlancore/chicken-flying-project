import React, { useState } from "react";
import Button from "../../base-components/Button";
import Modal from "../../base-components/Modal";
import TextField from "../../base-components/TextField";
import { renderIf } from "../../utils";

const caption = {
  createTitle: "Create Task",
  editTitle: "Edit Task",
  name: "Task Name",
  progress_percentage: "Progress",
  cancel: "Cancel",
  save: "Save Task",
};

const FormTaskModal = ({
  open,
  onCancel,
  onSubmit,
  loading,
  isEdit,
  defaultValue,
  todoId,
  itemId,
  error,
}) => {
  const title = isEdit ? caption.editTitle : caption.createTitle;
  const initFormData = defaultValue || { name: "", progress_percentage: "" };
  const [formData, setFormData] = useState(initFormData);

  const onValueUpdate = (key) => (value) => {
    const formDataDraft = { ...formData };
    formDataDraft[key] = value;

    setFormData(formDataDraft);
  };

  return (
    <Modal
      onClose={loading ? () => {} : onCancel}
      open={open}
      title={<span className="flex items-center">{title}</span>}
      content={
        <div>
          <TextField
            placeholder="Type your task"
            label={caption.name}
            value={formData.name}
            onChange={(e) => onValueUpdate("name")(e.target.value)}
          />
          <div className="h-3" />
          <TextField
            placeholder="70%"
            label={caption.progress_percentage}
            value={formData.progress_percentage}
            type="number"
            onChange={(e) =>
              onValueUpdate("progress_percentage")(Number(e.target.value))
            }
          />
          {renderIf(error)(
            <div>
              <div className="h-3" />
              <small className="text-danger">{error}</small>
            </div>
          )}
        </div>
      }
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button onClick={onCancel} disabled={loading}>
            {caption.cancel}
          </Button>
          <Button
            onClick={() => {
              onSubmit(isEdit, { ...formData, todoId, itemId });
            }}
            loading={loading}
            disabled={loading}
            variant="primary"
          >
            {caption.save}
          </Button>
        </div>
      }
    />
  );
};

export default FormTaskModal;
