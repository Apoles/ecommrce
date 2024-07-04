// src/utils/localStorage.js

export const SaveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch (e) {}
};

export const LoadFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
