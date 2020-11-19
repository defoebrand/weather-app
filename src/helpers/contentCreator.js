const contentCreator = {

  withText(type, content, className) {
    const element = document.createElement(type);
    element.textContent = content;
    element.classList.add(className);

    return element;
  },

  withPlaceholder(type, format, content, className) {
    const element = document.createElement(type);
    element.type = format
    element.placeholder = content;
    element.classList.add(className);

    return element;
  },

  withValue(type, format, value, className) {
    const element = document.createElement(type);
    element.type = format
    element.value = value;
    element.classList.add(className);

    return element;
  },

  withHTML(type, content, className) {
    const element = document.createElement(type);
    element.innerHTML = content;
    element.classList.add(className);

    return element;
  },

  withLabel(type, format, placeholder, className, labelFor, name) {
    const element = document.createElement(type);
    element.type = format;
    element.name = name;
    element.placeholder = placeholder;
    element.classList.add(className);
    element.id = labelFor;
    const label = document.createElement('label');
    label.textContent = labelFor;
    label.for = labelFor;
    label.appendChild(element);

    return label;
  },
};

export default contentCreator;