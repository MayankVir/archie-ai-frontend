import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/store";
import Cross from "../../assets/icons/png/cross.png";

const index = () => {
  const isMountedRef = useRef(false);
  const { handleLogout } = useStore((state) => state.auth);
  const { fetchChatHistory, isSidebarOpened, toggleSidebar } = useStore(
    (state) => state.data,
  );
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (isMountedRef.current) return;
    getConversations();

    isMountedRef.current = true;
  }, []);

  const getConversations = async () => {
    try {
      const response = await fetchChatHistory();
      setConversations(response.data);
    } catch (e) {}
  };

  if (isSidebarOpened === false) return <></>;

  return (
    <div
      className="absolute z-40 w-[100vw]  "
      style={{
        left: isSidebarOpened ? 0 : -300,
        backdropFilter: isSidebarOpened ? "blur(2px)" : "unset",
      }}
    >
      <div className="relative z-50 flex h-[100vh] w-[250px] bg-primary text-white p-8 px-4 flex-col gap-2 ">
        <img
          src={Cross}
          alt="cross icon"
          height={25}
          width={25}
          className="absolute -right-8 top-2 border border-white rounded-md cursor-pointer"
          onClick={() => toggleSidebar(false)}
        />
        <Link
          to={"/"}
          className="bg-gray-300 text-black rounded-md p-2 px-3 text-sm cursor-pointer transition-all hover:bg-gray-400"
        >
          + New Prompt
        </Link>

        <div className="w-full flex-1 overflow-auto">
          {conversations?.map((conversation) => (
            <a
              href={"/summary/" + conversation._id}
              key={conversation}
              className="w-full rounded-md p-2 px-3 text-sm font-light cursor-pointer truncate bg-neutral-700 hover:bg-neutral-800 faded-text"
            >
              {conversation.query}
            </a>
          ))}
        </div>
        <Link
          to={"/"}
          className=" bg-neutral-400 text-black rounded-md flex items-center justify-center hover:bg-neutral-500  cursor-pointer p-2 transition-all"
          onClick={() => handleLogout()}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default index;
