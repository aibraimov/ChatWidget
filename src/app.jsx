'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Api from './utils/api';
import Dnds from './dnds/index';
import Routes from './routes';

ReactDOM.render(<Dnds />, document.querySelector('.container'));
//ReactDOM.render(Routes, document.querySelector('.container'));
