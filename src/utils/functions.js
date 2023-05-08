export const getTypeFromPathname = () => {
  return window.location.pathname.split('/')[1];
}

export const strToPath = (str) => {
  return str.toLowerCase().split(' ').join('_');
}

export const pathToStr = (path) => {
  return path[0].toUpperCase() + path.slice(1).replace('_', ' ');
}