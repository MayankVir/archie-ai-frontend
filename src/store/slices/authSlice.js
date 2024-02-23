import { STORE_NAMES } from "../../constants/store";
// import { loginUserService } from "../../services/auth";
import { updateState } from "../common";
import { SIGN_IN, SIGN_UP } from "../../constants/auth";

const { AUTH } = STORE_NAMES;

export const createAuthSlice = (set) => ({
  [AUTH]: {
    isLoading: null,
    isLoggedIn: null,
    isAdmin: null,
    isLogout: null,
    name: null,
    email: null,
    token: null,
    type: null,

    handleLogout: () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    },

    handleUserLoginExternally: ({ name, email }) => {
      updateState(set, AUTH, {
        isLoggedIn: true,
        name,
        email,
        type: "A",
        isAdmin: true,
        isLoading: false,
        isLogout: false,
      });
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    },

    handleAuthentication: ({ email, password, confirmPassword = "", type }) => {
      set((prevState) => ({
        ...prevState,
        [AUTH]: {
          ...prevState[AUTH],
          isLoading: true,
        },
      }));

      // try {
      //   if (type === SIGN_IN) {
      //     // call sign in handler
      //     const response = loginUser();
      //     set((prevState) => ({
      //       ...prevState,
      //       [AUTH]: {
      //         ...prevState[AUTH],
      //         name,
      //         token,
      //         type,
      //         isLoggedIn: true,
      //         isAdmin: type === "A" ? true : false,
      //       },
      //     }));
      //   }

      //   if (type === SIGN_UP) {
      //     // call sign up handler
      //   }
      // } catch (e) {
      //   set((prevState) => ({
      //     ...prevState,
      //     auth: {
      //       ...prevState[AUTH],
      //       isLoading: false,
      //     },
      //   }));
      // }
    },

    setStateOnLoad: (key, value) => {
      set((state) => ({
        ...state,
        [AUTH]: { ...state[AUTH], [key]: value },
      }));
    },

    setLoggedIn: (value) => {
      set((state) => ({
        ...state,
        [AUTH]: { ...state[AUTH], isLoggedIn: value },
      }));
    },

    setIsAdmin: (value) => {
      set((state) => ({
        ...state,
        [AUTH]: { ...state[AUTH], isAdmin: value },
      }));
    },

    loginUser: async (payload) => {
      updateState(set, AUTH, {
        isAuthorizing: true,
      });

      try {
        const { data } = await loginUserService(payload);
        localStorage.setItem("name", data.name);
        localStorage.setItem("token", data.token);
        localStorage.setItem("type", data.type);

        updateState(set, AUTH, {
          isAuthorizing: false,
          name: data.name,
          token: data.token,
          type: data.type,
          isLoggedIn: true,
          isAdmin: data.type === "A",
          isLogout: false,
        });

        return Promise.resolve({ status: true, isAdmin: data.type === "A" });
      } catch (err) {
        updateState(set, AUTH, {
          isAuthorizing: false,
        });
        return Promise.reject({ status: false });
      }
    },

    logoutUser: () => {
      localStorage.clear();
      updateState(set, AUTH, {
        isLoggedIn: null,
        isAdmin: false,
        isAuthorizing: false,
        isLogout: true,
        isSignUpModalOpen: false,
        isSignInModalOpen: false,
        name: null,
        token: null,
        type: null,
      });
    },
  },
});
