import React, { Component } from 'react';
import '../stylesheets/imageeditor';
import Uploader from './components/uploader';

const ImagePreview = ({ value }) => (
  <div className="preview" style={{backgroundImage: "url(" + value + ")"}}></div>
);


export default class ImageEditor extends Component {
  render() {
    let { value, uploadMode = 'both' } = this.props;
    return (
      <div className="image-editor">
        <div className="view-area">
          {value ? <ImagePreview value={value}/> : <Uploader {...this.props} uploadMode={uploadMode}/>}
        </div>
      </div>
    );
  }
};
