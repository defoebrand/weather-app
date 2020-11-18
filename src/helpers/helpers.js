
  const capFirst = (string) => {
    string = string.charAt(0).toUpperCase() + string.slice(1);

    return string;
  };

  const clearContent = (content) => {
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  };


export { clearContent, capFirst };
