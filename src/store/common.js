export const updateState = (set, key, newState) =>
  set((prevState) => ({
    ...prevState,
    [key]: {
      ...prevState[key],
      ...newState,
    },
  }));
