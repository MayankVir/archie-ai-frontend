import React, { useState } from "react";
import History from "../../assets/icons/svg/history.svg";
import Back from "../../assets/icons/svg/back.svg";
import Down from "../../assets/icons/svg/down.svg";
import useStore from "../../store/store";
import { Link } from "react-router-dom";
import Title from "../../components/Title";

const index = ({ showBackBtn = false, showTitle = false }) => {
  const { isLoggedIn, name, handleLogout } = useStore((state) => state.auth);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="flex items-center justify-between my-16 mt-4 ">
      {showBackBtn || showTitle ? (
        <div className="flex gap-4 items-center justify-center">
          {showTitle && <Title fontSize={"28px"} />}
          {showBackBtn && <BackBtn />}
        </div>
      ) : (
        <div>
          <img src={History} alt="history icon" className="cursor-pointer" />
        </div>
      )}

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
  return (
    <Link
      to={"/"}
      className=" flex gap-2 p-3 py-1 rounded-lg bg-primary text-gray-400 hover:text-white transition-all text-sm cursor-pointer"
    >
      <img src={Back} alt="back btn" /> <span>Edit Prompt</span>
    </Link>
  );
};
