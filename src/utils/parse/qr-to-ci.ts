export const parseQrToCi = (values: any) => {
  const [, nombre, apellidos, cidentidad] = values
    .replace(/\r/g, "")
    .replace(/\n/g, " ")
    .split(/[A-Z]{1,2}:/)
    .map((item: any) => {
      return item
        .trim()
        .split(" ")
        .map((palabra: string) => {
          return `${palabra[0]}${palabra.toLowerCase().slice(1)}`;
        })
        .join(" ");
    });
  return {
    pnombre: nombre,
    papellido: apellidos,
    cidentidad,
  };
};
