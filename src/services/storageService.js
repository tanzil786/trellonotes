export const loadState = () => {
  try {
    const localState = localStorage.getItem("state");

    if (!localState) return undefined;
    return JSON.parse(localState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const localState = JSON.stringify(state);

    localStorage.setItem("state", localState);
  } catch (err) {
    console.error(err);
  }
};
