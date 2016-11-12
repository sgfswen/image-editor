import ImageEditor from './js/imageeditor';
import './stylesheets/index';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<ImageEditor link="browse" width="100px" height="100px" text="Drag here or"
                             value="http://mywindowshub.com/wp-content/uploads/2013/01/user-account.jpg"
                             noValueBg={<img src="http://mywindowshub.com/wp-content/uploads/2013/01/user-account.jpg"/>}/>
  , document.querySelector("#app-container"));
