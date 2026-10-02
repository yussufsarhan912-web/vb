import {Home,WorkPage,ServicesPage,ProcessPage,PricingPage,AboutPage,ApplyPage,ClippingPage,WorkDetail,Header,Footer} from './components/marketing';
import type {SiteContent} from './lib/content';
import snapshot from './content.json';
export const data=snapshot as SiteContent;
export const routes=['/','/work','/services','/process','/pricing','/about','/apply','/clipping',...data.portfolio.filter(w=>w.visible!==false&&w.id!=='brezplug').map(w=>'/work/'+w.id)];
export function titleFor(path:string){if(path==='/')return 'Veylon — Be the creator.';const work=data.portfolio.find(w=>'/work/'+w.id===path);const names:Record<string,string>={'/work':'Work','/services':'Services','/process':'Process','/pricing':'Pricing','/about':'About','/apply':'Apply','/clipping':'Clipping'};return (work?.title||names[path]||'Page not found')+' — Veylon'}
export default function App({path}:{path:string}){
 if(path==='/')return <Home data={data}/>;
 if(path==='/work')return <WorkPage data={data}/>;
 if(path==='/services')return <ServicesPage data={data}/>;
 if(path==='/process')return <ProcessPage/>;
 if(path==='/pricing')return <PricingPage data={data}/>;
 if(path==='/about')return <AboutPage data={data}/>;
 if(path==='/apply')return <ApplyPage/>;
 if(path==='/clipping'||path==='/work/brezplug')return <ClippingPage data={data}/>;
 const slug=path.slice('/work/'.length);
 if(path.startsWith('/work/')&&data.portfolio.some(w=>w.id===slug&&w.visible!==false))return <WorkDetail data={data} slug={slug}/>;
 return <><Header/><main className="wrap section"><h1>Page not found.</h1><a className="button" style={{marginTop:30}} href="/">Back to Veylon</a></main><Footer/></>;
}
