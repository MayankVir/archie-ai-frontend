import { STORE_NAMES } from "../../constants/store";
import {
  getConversationsService,
  pollOutputService,
  submitQueryService,
} from "../../services/prompt";
import { errorToast, successToast } from "../../utils/toast";
// import { loginUserService } from "../../services/auth";
import { updateState } from "../common";

const { DATA } = STORE_NAMES;

export const createDataSlice = (set) => ({
  [DATA]: {
    isFetchingOutput: null,
    currentConversationId: null,
    prompt: "Discuss microservices vs. monolithic architecture pros/cons",
    output: {
      code: `class Node:
      def __init__(self, data):
          self.data = data
          self.next = None
  
  class LinkedList:
      def __init__(self):
          self.head = None
  
      def append(self, data):
          new_node = Node(data)
          if not self.head:
              self.head = new_node
              return
          last_node = self.head
          while last_node.next:
              last_node = last_node.next
          last_node.next = new_node
  
      def display(self):
          current = self.head
          while current:
              print(current.data, end=" ")
              current = current.next
  
  linked_list = LinkedList()
  linked_list.append(1)
  linked_list.append(2)
  linked_list.append(3)
  linked_list.display()
  `,
      codeSummary: `This script implements a simple linked list with a Node class representing each element of the list and a LinkedList class for managing the list operations. It creates a linked list with three nodes containing the values 1, 2, and 3 respectively, and then displays the elements of the list.      `,
      dotFile: null,
    },
    summary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets \n containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Where does it come from?Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, ",

    submitQuery: async ({ prompt, navigate }) => {
      updateState(set, DATA, {
        prompt,
        isFetchingOutput: true,
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
          navigate("/summary");
        }
      } catch (err) {
        console.log({ err });
        errorToast({
          message: err?.response?.data?.msg ?? "Something went wrong",
        });
      }
    },

    handleLongPollOutputStatus: ({ id }) => {
      const data = pollOutputService({ id });
      console.log({ data });
      if (data.status === true) {
        updateState(set, DATA, {
          isFetchingOutput: false,
        });
      }
      return Promise.resolve(data);
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
        isFetchingOutput: false,
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
  },
});
