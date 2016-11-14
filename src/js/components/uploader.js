import React, { Component } from 'react';

export default class Uploader extends Component {
  state = {
    dropClass: ''
  };

  handleClick(e) {
    e.stopPropagation();
    this.fileNode.click();
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      dropClass: 'hovering',
    })
  }

  handleDragLeave() {
    this.setState({
      dropClass: '',
    });
  }

  handleDrop(e) {
    let [file] = e.target.files || e.dataTransfer.files;
    this.props.onSelected && this.props.onSelected(file);
  }

  handleChange(e) {
    let [selectedFile] = this.fileNode.files;
    this.props.onImageSelected && this.props.onImageSelected(selectedFile);
  }

  getModeString() {
    let { uploadMode ='both', text, link } = this.props;
    let dragStr = 'Drag and drop image here';
    let connStr = 'or use the';
    if (uploadMode == 'both') {
      let str = text || (dragStr + ' ' + connStr);
      let linkStr = link || 'file browser'
      return (
        <span className="upload-text">
          <span>{str}&nbsp;
            <a className='browse-link' href='javascript:void(0);' onClick={this.handleClick.bind(this)}>{linkStr}</a>
          </span>
        </span>
      );
    } else if (uploadMode == 'browser') {
      let str = text || 'Click to upload image';
      return (
        <span className="upload-text">{str}</span>
      );
    } else {
      let str = text || dragStr;
      return (
        <span className="upload-text">{str}</span>
      );
    }
  }

  getHandlers() {
    let handlers = {};
    let { uploadMode } = this.props;
    if (uploadMode != 'browser') {
      handlers = {
        onDragOver: this.handleDragOver.bind(this),
        onDragLeave: this.handleDragLeave.bind(this),
        onDrop: this.handleDrop.bind(this),
      };
    }
    if (uploadMode == 'browser' || uploadMode == 'both') {
      handlers.onClick = this.handleClick.bind(this);
    }
    return handlers;
  }

  render() {
    let { noValueBg } = this.props;
    return (
      <div className={"uploader " + (noValueBg ? '' : 'no-image') + this.props.uploadMode + ' ' + this.state.dropClass}>
        <div className={"drop-area"} {...this.getHandlers()}>
          {noValueBg ? noValueBg : this.getModeString()}
        </div>
        <input type="file" hidden ref={node => this.fileNode = node} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
};
