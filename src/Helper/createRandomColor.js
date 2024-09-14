const createRandomColor = () => {
  let R = Math.round(Math.random() * 255);
  let G = Math.round(Math.random() * 255);
  let B = Math.round(Math.random() * 255);

  return `rgb(${R}, ${G}, ${B})`;
};

export default createRandomColor;
