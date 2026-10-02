import {renderToString} from 'react-dom/server';
import App,{routes,titleFor} from './App';
export {routes,titleFor};
export function render(path:string){return renderToString(<App path={path}/>)}
