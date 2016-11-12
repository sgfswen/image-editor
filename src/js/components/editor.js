import React, { Component } from 'react';
import { targetDimensionValidator } from '../lib/propvalidator';

export default class Editor extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    mode: propListValidator.bind(null, componentModeMap),
    targetWidth: targetDimensionValidator,
    targetHeight: targetDimensionValidator,
    width: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className='editor'>
        <img src={value} />
      </div>
    );
  }
};
