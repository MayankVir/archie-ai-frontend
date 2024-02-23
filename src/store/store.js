import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createDataSlice } from "./slices/dataSlice";

const useStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createDataSlice(...a),
}));

export default useStore;
