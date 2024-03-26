import { STORE_NAMES } from "../../constants/store";
// import { loginUserService } from "../../services/auth";
import { updateState } from "../common";
import { SIGN_IN, SIGN_UP } from "../../constants/auth";
import { createUserService, loginUserService } from "../../services/auth";
import { errorToast } from "../../utils/toast";

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
      localStorage.removeItem("name");
      localStorage.removeItem("type");
      localStorage.removeItem("token");
      updateState(set, AUTH, {
        isLoading: null,
        isLoggedIn: null,
        isAdmin: null,
        isLogout: null,
        name: null,
        email: null,
        token: null,
        type: null,
      });
    },

    handleUserLoginExternally: ({ name, type, token }) => {
      updateState(set, AUTH, {
        isLoggedIn: true,
        name,
        type,
        isAdmin: true,
        isLoading: false,
        isLogout: false,
        token,
      });
      localStorage.setItem("name", name);
      localStorage.setItem("type", type);
      localStorage.setItem("token", token);
    },

    handleAuthentication: async ({
      name: userName,
      email,
      password,
      confirmPassword = "",
      isLoggingIn,
    }) => {
      set((prevState) => ({
        ...prevState,
        [AUTH]: {
          ...prevState[AUTH],
          isLoading: true,
        },
      }));
      let response;

      try {
        if (isLoggingIn === false) {
          response = await createUserService({
            name: userName,
            email,
            password,
            password1: confirmPassword,
          });
        }
        response = await loginUserService({ email, password });

        const { name, token, type } = response.data;

        set((prevState) => ({
          ...prevState,
          [AUTH]: {
            ...prevState[AUTH],
            name,
            token,
            type,
            isLoggedIn: true,
            isAdmin: type === "A" ? true : false,
          },
        }));
        localStorage.setItem("name", name);
        localStorage.setItem("token", token);
        localStorage.setItem("type", type);
        return Promise.resolve({ status: true });
      } catch (e) {
        errorToast({
          message: e?.response?.data?.msg ?? "Something went wrong",
        });
        // set((prevState) => ({
        //   ...prevState,
        //   auth: {
        //     ...prevState[AUTH],
        //     isLoading: false,
        //   },
        // }));
      }
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
