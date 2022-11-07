import * as React from 'react';
import {App} from './App';
import { createRoot } from 'react-dom/client';

import './style.scss';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);