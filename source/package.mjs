import {readFile,mkdir,writeFile,cp,rm} from 'node:fs/promises';
import {render,routes,titleFor} from './.build-server/render.js';
const template=await readFile(new URL('./.build-client/index.html',import.meta.url),'utf8');
const target=new URL('../public/',import.meta.url);
await rm(new URL('assets/',target),{recursive:true,force:true});
await cp(new URL('./.build-client/assets/',import.meta.url),new URL('assets/',target),{recursive:true});
for(const path of [...routes,'/404']){
 const file=path==='/'?'index.html':path.slice(1)+'.html';
 const location=new URL(file,target);
 await mkdir(new URL('.',location),{recursive:true});
 const html=template.replace('<div id="root"></div>','<div id="root">'+render(path)+'</div>').replace('<title>Veylon — Be the creator.</title>','<title>'+titleFor(path).replaceAll('&','&amp;').replaceAll('<','&lt;')+'</title>');
 await writeFile(location,html);
}
console.log('Prepared '+routes.length+' fully rendered pages, plus a 404 page.');
