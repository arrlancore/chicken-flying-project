import React from "react";
import { ReactComponent as PlusIcon } from "../assets/icon/plus.svg";
import { renderIf } from "../utils";
import Button from "./Button";

const caption = {
  title: "Project Roadmap",
  signIn: "Sign In",
  newGroup: "Add New Group",
  signout: "Sign Out",
};

const HeaderButton = ({ children, ...rest }) => {
  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-lg disabled:opacity-30
                 px-4 py-1 text-sm font-bold text-white bg-primary shadow-sm hover:opacity-90"
      {...rest}
    >
      {children}
    </button>
  );
};

const Header = ({
  signedIn,
  onClickNewGroup,
  onClickSignIn,
  onClickSignOut,
}) => {
  return (
    <header>
      <div
        className="flex items-center justify-between border-b-[1px]
       border-[#E0E0E0] py-2 h-[64px] md:justify-start md:space-x-10"
      >
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/" className="flex items-center mr-4">
            <h1 className="text-lg font-bold text-[#1E1F21]">
              {caption.title}
            </h1>
          </a>
          {renderIf(signedIn)(
            <HeaderButton onClick={onClickNewGroup}>
              <PlusIcon className="mr-1" />
              {caption.newGroup}
            </HeaderButton>
          )}
        </div>

        <div className="items-center justify-end">
          {renderIf(signedIn === false)(
            <HeaderButton onClick={onClickSignIn}>
              {caption.signIn}
            </HeaderButton>
          )}
          {renderIf(signedIn)(
            <Button onClick={onClickSignOut}>{caption.signout}</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
