import React, { useState } from "react";
import Down from "../../assets/icons/svg/down.svg";
import Menu from "../../assets/icons/svg/menu.svg";
import useStore from "../../store/store";
import { Link } from "react-router-dom";
import Title from "../../components/Title";

const index = ({
  showBackBtn = false,
  showTitle = false,
  style = {},
  showMenu = true,
}) => {
  const { isLoggedIn, name, handleLogout } = useStore((state) => state.auth);
  const { toggleSidebar } = useStore((state) => state.data);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div
      className=" relative flex items-center justify-between my-16 mt-4 "
      style={style}
    >
      {showBackBtn || showTitle || showMenu ? (
        <div className="flex gap-4 items-center justify-center">
          {showMenu && (
            <div onClick={() => toggleSidebar(true)} className="cursor-pointer">
              <img src={Menu} alt="menu icon" />
            </div>
          )}
          {showTitle && <Title fontSize={"28px"} />}
          {showBackBtn && <BackBtn />}
        </div>
      ) : null}

      <div className=" text-white relative flex flex-col gap-2 items-end">
        {isLoggedIn ? (
          <>
            <span
              className="truncate flex items-center justify-center gap-2 cursor-pointer transition-all hover:text-gray-400"
              onClick={() => setShowLogout((p) => !p)}
            >
              {name}
              <img
                src={Down}
                alt="down arrow"
                width={16}
                height={16}
                style={{
                  transform: showLogout ? "rotate(180deg)" : "",
                }}
              />
            </span>
            {showLogout && (
              <a
                href="/"
                className="bg-white text-black p-2 py-1 rounded-md text-md absolute w-full text-center cursor-pointer top-7"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </a>
            )}
          </>
        ) : (
          <Link to={"/login"} className=" cursor-pointer ">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default index;

export const BackBtn = () => {
  const { toggleEditingPrompModal } = useStore((state) => state.data);
  return <></>;

  return (
    <div
      onClick={() => toggleEditingPrompModal(true)}
      className=" flex items-center gap-2 p-3 py-1 rounded-lg bg-primary text-gray-400 hover:text-white transition-all text-sm cursor-pointer"
    >
      <span>Edit Prompt</span>
    </div>
  );
};
