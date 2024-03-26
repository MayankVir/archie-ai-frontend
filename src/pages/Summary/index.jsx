import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Back from "../../assets/icons/svg/back.svg";

import Navbar from "../../components/Navbar";
import Output from "../../components/Output";
import Summary from "../../components/Summary";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import FadeAway from "../../components/Typewriter/FadeAway";
import FailedOutput from "../../components/Summary/FailedOutput";

import useStore from "../../store/store";

import Modal from "../../components/Modal";

const index = () => {
  const timerRef = useRef(null);
  const isMountedRef = useRef(false);
  const params = useParams();
  const {
    isFetchingOutputStatus,
    isEditingPromptModalOpen,
    isFetchingConversationDetails,
    fetchSingleConversation,
    status,
    currentConversationId,
    handleLongPollOutputStatus,
    toggleEditingPrompModal,
  } = useStore((state) => state.data);

  const [isPolling, setIsPolling] = useState(false);

  const fetchConversationDetails = async (id) => {
    try {
      await fetchSingleConversation({ id });
    } catch (err) {
      errorToast({ message: err });
    }
  };

  const renderSummary = () => {
    if (isFetchingOutputStatus || isFetchingConversationDetails) {
      return (
        <div className="h-[75%] w-full flex flex-col items-center justify-center -mt-24">
          <Loader />
          <div className="text-gray-300 mt-7 -ml-72 ">
            <FadeAway
              textArray={[
                "Sit back and Relax",
                "We are summarizing your results.",
              ]}
            />
          </div>
        </div>
      );
    }

    if (status === "FAILED") {
      clearInterval(timerRef.current);
      return <FailedOutput />;
    }

    if (status === "COMPLETED") {
      clearInterval(timerRef.current);
      return (
        <>
          <Output />
          <Summary />
        </>
      );
    }
  };

  useEffect(() => {
    if (isMountedRef.current) return;
    const { conversation_id } = params;
    if (conversation_id) {
      fetchConversationDetails(conversation_id);

      isMountedRef.current = true;
    }
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (status === "PENDING" && isPolling === false) {
      setIsPolling(true);
      timerRef.current = setInterval(() => {
        handleLongPollOutputStatus({
          id: currentConversationId,
        });
      }, 10000);
    }
    if (status !== "PENDING" && status.length > 0) {
      clearInterval(timerRef.current);
    }
  }, [status, isPolling]);

  return (
    <div className="flex h-[100vh] w-full">
      <Sidebar />
      <div className="flex flex-col p-8 md:px-16 px-8 w-full overflow-auto ">
        <Navbar showTitle={true} showBackBtn={true} />
        {renderSummary()}
      </div>
      <Modal
        isOpen={isEditingPromptModalOpen}
        onClose={() => toggleEditingPrompModal(false)}
      >
        <EditingPromptModal />
      </Modal>
      <div id="modal-root"></div>
    </div>
  );
};

export default index;

const EditingPromptModal = () => {
  const { prompt, handleSubmitQuery, toggleEditingPrompModal } = useStore(
    (state) => state.data,
  );
  const [localPrompt, setLocalPrompt] = useState(prompt);
  return (
    <div className="w-full h-full text-white">
      <label className="text-xl">Edit Prompt</label>
      <div className="relative rounded-2xl bg-gradient w-full h-[125px] my-4">
        <textarea
          className="text-white p-2 px-3 text-sm w-full h-full rounded-2xl bg-primary focus:outline-none "
          style={{
            width: "calc(100% - 4px)",
            height: "calc(100% - 4px)",
            resize: "none",
            overflow: "auto",
            margin: "2px",
          }}
          value={localPrompt ?? ""}
          placeholder="Ask anything related to architecture..."
          onChange={(e) => setLocalPrompt(e.target.value)}
        />
        <span
          src={Back}
          alt="back arrow"
          className="text-center absolute right-4 bottom-3 w-[32px] h-[24px] bg-black text-white rounded-md cursor-pointer increase-scale-1"
          onClick={() => {
            handleSubmitQuery();
            toggleEditingPrompModal(false);
          }}
        >
          &#x2192;
        </span>
      </div>
    </div>
  );
};
