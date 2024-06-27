// src/utils/localStorage.js

export const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error('Could not save to local storage', e);
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load from local storage', e);
    return undefined;
  }
};
