export const getTypeFromPathname = () => {
  return window.location.pathname.split('/')[1];
}

export const strToPath = (str) => {
  return str.toLowerCase().split(' ').join('_');
}

export const pathToStr = (path) => {
  return path[0].toUpperCase() + path.slice(1).replace('_', ' ');
}

export const unique = (arr) => {
  return arr.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);
}