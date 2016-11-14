import React, { Component } from 'react';
import '../stylesheets/imageeditor';
import Uploader from './components/uploader';
import InPlaceEditor from './components/editor/inplace';
import ModalEditor from './components/editor/modal';
import {
  uploadModeValidator,
  componentModeValidator,
  editorModeValidator,
  valueValidator,
  targetDimensionValidator,
} from './lib/propvalidator';

const ImagePreview = ({ value, height, width }) => (
  <div className='preview' style={{height: height, width: width, backgroundImage: 'url(' + value + ')'}}/>
);

export default class ImageEditor extends Component {
  static propTypes = {
    value: valueValidator,
    uploadMode: uploadModeValidator,
    mode: componentModeValidator,
    editorMode: editorModeValidator,
    width: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired,
    targetWidth: targetDimensionValidator,
    targetHeight: targetDimensionValidator,
  };

  state = {};

  onSelected(file) {
    const { mode = 'both' } = this.props;
    if (mode == 'editor') {
      this.setState({
        tempValue: file,
      });
    } else {
      this.props.onSelected && this.props.onSelected(file);
    }
  }

  getViewArea() {
    const { value, height, width, uploadMode = 'both', editorMode = 'in-place', mode = 'both' } = this.props;
    let imgValue = mode == 'editor' ? this.props.value : this.state.tempValue;
    if (mode == 'editor' && !value) {
      throw new Error(`'value' property is mandatory for 'editor' mode`);
    }
    if (imgValue) {
      return editorMode == 'in-place' ? <InPlaceEditor value={imgValue}/> : <ModalEditor value={imgValue}/>;
    } else {
      return (
        <div className='view-area'>
          {value ? <ImagePreview height={height} width={width} value={value}/> :
            <Uploader {...this.props} onImageSelected={this.onSelected.bind(this)} uploadMode={uploadMode}/>}
        </div>
      );
    }
  }

  render() {
    const { height, width } = this.props;
    return (
      <div style={{height: height, width: width}} className='image-editor'>
        {this.getViewArea()}
      </div>
    );
  }
};
