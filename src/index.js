import ImageEditor from './js/imageeditor';
import './stylesheets/index';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<ImageEditor link="browse" width="800px" height="300px" text="Drag here or" mode="editor"
                             value="http://webneel.com/wallpaper/sites/default/files/images/01-2014/2-flower-wallpaper.jpg"
                             noValueBg={<img className='no-value' src="http://mywindowshub.com/wp-content/uploads/2013/01/user-account.jpg"/>}/>
  , document.querySelector("#app-container"));
