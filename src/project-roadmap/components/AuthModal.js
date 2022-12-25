import { Action } from "@remix-run/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../base-components/Button";
import Modal from "../../base-components/Modal";
import TextField from "../../base-components/TextField";
import { renderIf } from "../../utils";
import { loginUser, signUpUser } from "../store/user/userAction";

const caption = {
  login: "Login",
  signup: "Sign Up",
  askSignUp: "Not a member?",
  askSignUpCta: "Sign Up",
  taskName: "Task Name",
  progress: "Progress",
  cancel: "Cancel",
  save: "Save Task",
  name: "Name",
  email: "Email",
  password: "Password",
  password_confirmation: "Password Confirmation",
};

const AuthModal = ({ open, onCancel }) => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const user = useSelector((state) => state.user);
  const title = isSignUp ? caption.signup : caption.login;
  const initFormData = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [formData, setFormData] = useState(initFormData);

  const onValueUpdate = (key) => (value) => {
    const formDataDraft = { ...formData };
    formDataDraft[key] = value;

    setFormData(formDataDraft);
  };

  const handleSubmit = () => {
    if (isSignUp) {
      const { name, email, password, password_confirmation } = formData;
      if (!name || !email || !password || !password_confirmation)
        return alert(
          "name, email, password & password_confirmation is required!"
        );

      return dispatch(signUpUser(formData));
    }

    const { email, password } = formData;
    if (!email || !password) return alert("email & password is required!");

    dispatch(loginUser({ email, password }));
  };

  return (
    <Modal
      onClose={onCancel}
      open={open}
      title={<span className="flex items-center">{title}</span>}
      content={
        <div>
          {renderIf(isSignUp)(
            <TextField
              placeholder="type name"
              label={caption.name}
              value={formData.name}
              onChange={(e) => onValueUpdate("name")(e.target.value)}
            />
          )}
          <div className="h-3" />
          <TextField
            placeholder="type email"
            label={caption.email}
            value={formData.email}
            onChange={(e) => onValueUpdate("email")(e.target.value)}
          />
          <div className="h-3" />
          <TextField
            placeholder="type password"
            label={caption.password}
            value={formData.password}
            type="password"
            onChange={(e) => onValueUpdate("password")(e.target.value)}
          />
          {renderIf(isSignUp)(
            <>
              <div className="h-3" />
              <TextField
                placeholder="re-enter password"
                label={caption.password_confirmation}
                value={formData.password_confirmation}
                type="password"
                onChange={(e) =>
                  onValueUpdate("password_confirmation")(e.target.value)
                }
              />
            </>
          )}
          {renderIf(user.errorSignUp && isSignUp === false)(
            <div>
              <div className="h-3" />
              <small className="text-danger">{user.errorLogin}</small>
            </div>
          )}
          {renderIf(user.errorSignUp && isSignUp)(
            <div>
              <div className="h-3" />
              <small className="text-danger">{user.errorSignUp}</small>
            </div>
          )}
        </div>
      }
      footer={
        <div className="flex w-full items-center justify-end gap-3">
          <small>
            {!isSignUp ? (
              <>
                {caption.askSignUp}{" "}
                <span
                  onClick={() => setIsSignUp(true)}
                  className="cursor-pointer text-secondary"
                >
                  {caption.askSignUpCta}
                </span>{" "}
              </>
            ) : (
              <span
                onClick={() => setIsSignUp(false)}
                className="cursor-pointer text-secondary"
              >
                {caption.login}
              </span>
            )}
          </small>
          <Button
            onClick={handleSubmit}
            loading={user.loading}
            disabled={user.loading}
            variant="primary"
          >
            {title}
          </Button>
        </div>
      }
    />
  );
};

export default AuthModal;
