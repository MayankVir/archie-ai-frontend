import React, { useEffect, useState } from "react";
import useStore from "../../store/store";

const index = () => {
  const { fetchChatHistory } = useStore((state) => state.data);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async () => {
    try {
      const response = await fetchChatHistory();
      setConversations(response.data);
    } catch (e) {}
  };

  return (
    <div className="h-[100vh] w-[20%] bg-primary text-white p-8 px-4 flex flex-col gap-2">
      <div className="bg-gray-300 text-black rounded-md p-2 px-3 text-sm cursor-pointer transition-all hover:bg-gray-400">
        + New Prompt
      </div>

      {conversations?.map((conversation) => (
        <div className="bg-gray-600 rounded-md p-2 px-3 text-sm cursor-pointer truncate hover:bg-gray-700">
          {conversation.query}
        </div>
      ))}

      {/* <div className="bg-gray-600 rounded-md p-2 px-3 text-sm cursor-pointer">
        Second Prompt{" "}
      </div>
      <div className="bg-gray-600 rounded-md p-2 px-3 text-sm cursor-pointer">
        Third Prompt{" "}
      </div> */}
    </div>
  );
};

export default index;
