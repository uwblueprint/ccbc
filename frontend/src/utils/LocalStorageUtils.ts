// Get a string value from localStorage as an object
export const getLocalStorageObj = <O>(localStorageKey: string): O | null => {
  const stringifiedObj = localStorage.getItem(localStorageKey);
  let object = null;

  if (stringifiedObj) {
    try {
      object = JSON.parse(stringifiedObj);
    } catch (error) {
      object = null;
    }
  }

  return object;
};

// Get a property of an object value from localStorage
export const getLocalStorageObjProperty = <O extends Record<string, P>, P>(
  localStorageKey: string,
  property: string,
): P | null => {
  const object = getLocalStorageObj<O>(localStorageKey);
  if (!object) return null;

  return object[property];
};

// Set a property of an object value in localStorage
export const setLocalStorageObjProperty = <O extends Record<string, string>>(
  localStorageKey: string,
  property: string,
  value: string,
): void => {
  const object: Record<string, string> | null =
    getLocalStorageObj<O>(localStorageKey);

  if (!object) return;

  object[property] = value;
  localStorage.setItem(localStorageKey, JSON.stringify(object));
};
