import {hydrateRoot} from 'react-dom/client';
import App from './App';
import './globals.css';
const path=location.pathname.replace(/\/index\.html$/,'/').replace(/\.html$/,'').replace(/\/$/,'')||'/';
hydrateRoot(document.getElementById('root')!,<App path={path}/>);
