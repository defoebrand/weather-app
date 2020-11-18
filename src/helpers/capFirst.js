const capFirst = (string) => {
  string = string.charAt(0).toUpperCase() + string.slice(1);

  return string;
};

export default capFirst;