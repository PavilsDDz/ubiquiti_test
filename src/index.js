import * as React from 'react';
import {App} from './App';
import { createRoot } from 'react-dom/client';

import 'antd/dist/antd.css';
import './style.scss';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);

// document.addEventListener('click')
