export const setHogar = (idHogar: string) =>
  localStorage.setItem("hogarActual", idHogar);

export const getHogar = () => localStorage.getItem("hogarActual");

export const unsetHogar = () => {
  localStorage.removeItem("hogarActualJefe");
  localStorage.removeItem("hogarActual");
  localStorage.removeItem("hogarActualDireccion");
};

export const setJefeHogar = (idHogar: string) =>
  localStorage.setItem("hogarActualJefe", idHogar);

export const getJefeHogar = () => localStorage.getItem("hogarActualJefe");

export const unsetJefeHogar = () => localStorage.removeItem("hogarActualJefe");

export const setDireccionHogar = (idHogar: string) =>
  localStorage.setItem("hogarActualDireccion", idHogar);

export const getDireccionHogar = () =>
  localStorage.getItem("hogarActualDireccion");

export const unsetDireccionHogar = () =>
  localStorage.removeItem("hogarActualDireccion");
