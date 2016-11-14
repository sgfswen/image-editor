import React, { Component } from 'react';
import { throttle } from '../../lib/utils';

export default class Editor extends Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string,
    ])
  };

  state = {
    top: 0,
    left: 0,
    loading: false,
  };

  updateImagePosition(currentX, currentY) {
    if(currentX != 0 && currentY != 0 && this.startX != currentX && this.startY != currentY) {
      const xOffset = this.startX - currentX;
      const yOffset = this.startY - currentY;
      const proposedLeft = this.state.left - xOffset;
      const proposedTop = this.state.top - yOffset;
      let newData = {};
      if (xOffset < 0) {
        newData.left = proposedLeft > this.maxLeft ? this.maxLeft : proposedLeft;
      } else if (xOffset > 0) {
        newData.left = proposedLeft < this.leastLeft ? this.leastLeft : proposedLeft;
      }
      if (yOffset < 0) {
        newData.top = proposedTop > this.maxTop ? this.maxTop : proposedTop;
      } else if (yOffset > 0) {
        newData.top = proposedTop < this.leastTop ? this.leastTop : proposedTop;
      }
      Object.keys(newData).length > 0 && this.setState(newData);
      this.startX = currentX;
      this.startY = currentY;
    }
  }

  componentWillMount() {
    const { value } = this.props;
    if (typeof value != 'string') {
      const fr = new FileReader();
      fr.onload = () => this.setState({
        imageUrl: fr.result,
      });
      fr.readAsDataURL(value);
    } else {
      this.setState({
        imageUrl: value
      });
    }
  }

  handleDragStart(e) {
    const div = document.createElement('div');
    this.dummy = div;
    div.style.visibility = "hidden";
    div.style.height = '1px';
    div.style.width = '1px';
    document.body.appendChild(div);
    e.dataTransfer.setDragImage(div, 0, 0);
    this.dragHandler = throttle(this.handleDrag, {
      _this: this,
      threshold: 50,
    });
    this.dragEndHandler = this.handleDragEnd.bind(this);
    this.imgNode.addEventListener('drag', this.dragHandler);
    this.imgNode.addEventListener('dragend', this.dragEndHandler);
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.dragging = true;
    return false;
  }

  handleDrag(e) {
    this.dragging && this.updateImagePosition(e.clientX, e.clientY);
  }

  handleDragEnd(e) {
    console.log('drag end');
    this.imgNode.removeEventListener('drag', this.dragHandler);
    this.imgNode.removeEventListener('dragend', this.dragEndHandler);
    this.dragging = false;
    document.body.removeChild(this.dummy);
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const _this = this;
    this.imgNode.addEventListener('load', function() {
      const imageHeight = _this.imgNode.offsetHeight;
      const imageWidth = _this.imgNode.offsetWidth;
      const targetHeight = _this.targetNode.offsetHeight;
      const targetWidth = _this.targetNode.offsetWidth;
      _this.maxTop = 0;
      _this.maxLeft = 0;
      _this.leastTop = -(imageHeight - targetHeight);
      _this.leastLeft = -(imageWidth - targetWidth);
      _this.setState({
        loading: false,
      })
    })
  }

  render() {
    const { imageUrl } = this.state;
    const styles = {
      top: this.state.top + 'px',
      left: this.state.left + 'px',
    };
    return (
      <div className='editor in-place'>
        <div className={`window${this.state.loading ? ' loading' : ''}`} ref={node => this.targetNode = node} onDragStart={this.handleDragStart.bind(this)}>
          <img src={imageUrl} style={styles} draggable="true" ref={node => this.imgNode = node}/>
        </div>
        <div className='overlay'></div>
      </div>
    );
  }
};
