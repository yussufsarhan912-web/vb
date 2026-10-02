// Preserve the existing application inbox without moving the client's portal.
// No credentials, cookies, or client/staff identity are forwarded.
const upstream='https://veylon-creator-growth.vu1ture.chatgpt.site';
export default async function handler(req,res){
 res.setHeader('Content-Type','application/json');
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Use the application form to submit your details.'})}
 let origin;try{origin=new URL(req.headers.origin)}catch{return res.status(403).json({error:'Please reload this page and try again.'})}
 if(origin.host!==req.headers.host)return res.status(403).json({error:'Please reload this page and try again.'});
 try{
  const body=typeof req.body==='string'?req.body:JSON.stringify(req.body??{});
  if(Buffer.byteLength(body)>1500000)return res.status(413).json({error:'This request is too large.'});
  const response=await fetch(upstream+'/api/applications',{
   method:'POST',headers:{'Content-Type':'application/json','Origin':upstream},body,
   redirect:'error',signal:AbortSignal.timeout(45000)
  });
  const data=await response.json();
  return res.status(response.status).json(data);
 }catch{
  return res.status(502).json({error:'We couldn’t send your application. Please try again in a moment.'});
 }
}
