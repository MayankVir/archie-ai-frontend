import { STORE_NAMES } from "../../constants/store";
import {
  getConversationDetailsService,
  getConversationsService,
  pollOutputService,
  submitQueryService,
} from "../../services/prompt";
import { errorToast, successToast } from "../../utils/toast";
import { updateState } from "../common";

const { DATA } = STORE_NAMES;

export const createDataSlice = (set) => ({
  [DATA]: {
    isSidebarOpened: false,
    isFetchingOutputStatus: null,
    isFetchingConversationDetails: null,
    currentConversationId: null,
    isEditingPromptModalOpen: false,
    prompt: "",
    code: "",
    dot_file_contents: "",
    key_components: "",
    next_steps: "",
    summary: "",
    status: "",

    toggleSidebar: (value) => {
      updateState(set, DATA, {
        isSidebarOpened: value,
      });
    },

    submitQuery: async ({ prompt }) => {
      updateState(set, DATA, {
        prompt,
      });
      try {
        const response = await submitQueryService({ query: prompt });
        const {
          data: { data, success, msg },
        } = response;

        if (success) {
          successToast({ message: msg });
          updateState(set, DATA, {
            currentConversationId: data._id,
          });
        }
        return Promise.resolve(data);
      } catch (err) {
        errorToast({
          message: err?.response?.data?.msg ?? "Something went wrong",
        });
        updateState(set, DATA, {
          isFetchingConversationDetails: false,
        });
        return Promise.reject(
          err?.response?.data?.msg ?? "Something went wrong",
        );
      }
    },

    fetchSingleConversation: async ({ id }) => {
      updateState(set, DATA, {
        isFetchingConversationDetails: true,
        isFetchingOutputStatus: true,
        currentConversationId: id,
      });

      try {
        const response = await getConversationDetailsService(id);
        const {
          data: { data, success, msg },
        } = response;

        const {
          code = "",
          dot_file_contents = "",
          key_components = "",
          next_steps = "",
          summary = "",
        } = data;

        console.log({ data, response });

        if (success) {
          updateState(set, DATA, {
            prompt: data.query,
            status: data.current_status,
            isFetchingConversationDetails: false,
            isFetchingOutputStatus:
              data.current_status === "PENDING" ? true : false,
            ...(data.current_status === "COMPLETED" && {
              code,
              dot_file_contents,
              key_components,
              next_steps,
              summary,
            }),
          });
        }
        return Promise.resolve(response.data);
      } catch (err) {
        errorToast({
          message: err?.response?.data?.msg ?? "Something went wrong",
        });
        updateState(set, DATA, {
          isFetchingConversationDetails: false,
          isFetchingOutputStatus: false,
        });
        return Promise.reject(
          err?.response?.data?.msg ?? "Something went wrong",
        );
      }
    },

    handleLongPollOutputStatus: async ({ id }) => {
      updateState(set, DATA, {
        isFetchingOutputStatus: true,
      });
      try {
        const response = await pollOutputService(id);

        const {
          data: { data, success, msg },
        } = response;

        const {
          code = "",
          dot_file_contents = "",
          key_components = "",
          next_steps = "",
          summary = "",
        } = data;

        updateState(set, DATA, {
          isFetchingOutputStatus:
            data.current_status === "PENDING" ? true : false,
          status: data.current_status,
          ...(data.current_status === "COMPLETED" && {
            code,
            dot_file_contents,
            key_components,
            next_steps,
            summary,
          }),
        });
        return Promise.resolve(data);
      } catch (err) {
        updateState(set, DATA, {
          isFetchingOutputStatus: false,
        });
        console.log(err);
        return Promise.reject(
          err?.response?.data?.msg ?? "Something went wrong",
        );
      }
    },

    handleSetOutput: ({ data }) => {
      const { code, codeSummary, dotFile, summary } = data;
      updateState(set, DATA, {
        output: {
          code,
          codeSummary,
          dotFile,
        },
        summary,
        isFetchingOutputStatus: false,
      });
    },

    fetchChatHistory: async () => {
      try {
        const response = await getConversationsService();
        return Promise.resolve(response.data);
      } catch (err) {
        console.log(err);
      }
    },

    changeFetchingOutputStatus: (state) => {
      updateState(set, DATA, {
        isFetchingOutputStatus: state,
      });
    },

    setCurrentConversationId: (id) => {
      updateState(set, DATA, {
        currentConversationId: id,
      });
    },

    changeFetchingConversationDetailsStatus: (state) => {
      updateState(set, DATA, {
        isFetchingConversationDetails: state,
      });
    },

    toggleEditingPrompModal: (state) => {
      updateState(set, DATA, {
        isEditingPromptModalOpen: state,
      });
    },
  },
});
