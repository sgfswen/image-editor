const uploadModeMap = ['both', 'drag', 'browser'];
const componentModeMap = ['editor', 'uploader', 'both'];
const editorModeMap = ['in-place', 'modal'];

const propListValidator = (validList, props, propName, componentName) => {
  const propValue = props[propName];
  if (propValue && validList.indexOf(propValue) < 0) {
    return new Error('Invalid value ' + propValue + ' provided for property ' + propName + ' to component '
      + componentName + '. Value should be one amongst the following - ' + validList.join());
  }
};

export const uploadModeValidator = propListValidator.bind(null, uploadModeMap);
export const componentModeValidator = propListValidator.bind(null, componentModeMap);
export const editorModeValidator = propListValidator.bind(null, editorModeMap);

export const targetDimensionValidator = (props, propName, componentName) => {
  const propValue = props[propName];
  if (props.mode == 'modal' && !propValue) {
    return new Error(`'${propName}' property is required when 'editorMode' is 'modal'`);
  }
};

export const valueValidator = (props, propName, componentName) => {
  const propValue = props[propName];
  if(props.mode == 'editor' && !propValue) {
    return new Error(`'value' property is mandatory for 'editor' mode`);
  }
};