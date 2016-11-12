import React, { Component } from 'react';
import '../stylesheets/imageeditor';
import Uploader from './components/uploader';
import { uploadModeValidator, componentModeValidator, editorModeValidator } from './lib/propvalidator';

const ImagePreview = ({ value, height, width }) => (
  <div className='preview' style={{height: height, width: width, backgroundImage: 'url(' + value + ')'}}/>
);

export default class ImageEditor extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    uploadMode: uploadModeValidator,
    mode: componentModeValidator,
    editorMode: editorModeValidator,
    width: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired,
  };

  onSelected(file) {
    const { mode = 'editor', editorMode = 'in-place' } = this.props;
    if (mode == 'editor') {
      this.setState({
        tempValue: file,
      });
    } else {
      this.props.onSelected && this.props.onSelected(file);
    }
  }

  render() {
    let { value, height, width, uploadMode = 'both' } = this.props;
    return (
      <div style={{height: height, width: width}} className='image-editor'>
        <div className='view-area'>
          {value ? <ImagePreview height={height} width={width} value={value}/> :
            <Uploader {...this.props} onImageSelected={this.onSelected} uploadMode={uploadMode}/>}
        </div>
      </div>
    );
  }
};
