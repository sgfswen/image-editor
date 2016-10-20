import ImageEditor from './js/imageeditor';
import uploaderTheme from './stylesheets/index';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<ImageEditor theme={uploaderTheme} link="browse"
                             text="Drag here or"/>, document.querySelector("#app-container"));
