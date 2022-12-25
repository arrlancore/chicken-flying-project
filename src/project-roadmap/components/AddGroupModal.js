import React, { useState } from "react";
import Button from "../../base-components/Button";
import Modal from "../../base-components/Modal";
import TextField from "../../base-components/TextField";
import { renderIf } from "../../utils";

const caption = {
  title: "Add Group",
  name: "Title",
  description: "Description",
  cancel: "Cancel",
};

const AddGroupModal = ({ open, onCancel, onSubmit, loading, error }) => {
  const initFormData = { title: "", description: "" };
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
      title={<span className="flex items-center">{caption.title}</span>}
      content={
        <div>
          <TextField
            placeholder="group title"
            label={caption.name}
            value={formData.title}
            onChange={(e) => onValueUpdate("title")(e.target.value)}
          />
          <div className="h-3" />
          <TextField
            placeholder="group description"
            label={caption.description}
            value={formData.description}
            onChange={(e) => onValueUpdate("description")(e.target.value)}
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
            onClick={() => onSubmit(formData)}
            loading={loading}
            disabled={loading}
            variant="primary"
          >
            {caption.title}
          </Button>
        </div>
      }
    />
  );
};

export default AddGroupModal;
