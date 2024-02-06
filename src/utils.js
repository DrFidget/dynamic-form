export function DEEPCOPY(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let copy;
  if (Array.isArray(obj)) {
    copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = DEEPCOPY(obj[i]);
    }
  } else {
    copy = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = DEEPCOPY(obj[key]);
      }
    }
  }
  return copy;
}
