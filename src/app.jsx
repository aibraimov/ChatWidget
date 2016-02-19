'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Api from './utils/api';
import Routes from './routes';

//import Dnds from './dnds/index';

//ReactDOM.render(<Dnds />, document.querySelector('.container'));
ReactDOM.render(Routes, document.querySelector('.container'));
