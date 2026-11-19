import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,dirname,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');const files=[];
function walk(d){for(const e of readdirSync(d,{withFileTypes:true})){if(e.name.startsWith('.')||e.name==='node_modules'||e.name==='dist')continue;const p=resolve(d,e.name);if(e.isDirectory())walk(p);else files.push(p);}}walk(root);
const pages=files.filter(p=>p.endsWith('.html'));const ids=new Map(pages.map(p=>[p,new Set([...readFileSync(p,'utf8').matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));let links=0;
for(const p of pages){const text=readFileSync(p,'utf8');if([...text.matchAll(/<h1\b/g)].length!==1)throw Error('Expected one h1: '+p);if([...text.matchAll(/\bid="([^"]+)"/g)].length!==ids.get(p).size)throw Error('Duplicate ID: '+p);for(const m of text.matchAll(/(?:href|src|poster)="([^"]+)"/g)){const val=m[1];if(/^(?:[a-z]+:|\/\/)/i.test(val))continue;const [path,fragment]=val.split('#');let target=path?resolve(dirname(p),path):p;if(path==='./')target=resolve(dirname(p),'index.html');if(!existsSync(target))throw Error(relative(root,p)+' missing '+val);if(fragment&&ids.has(target)&&!ids.get(target).has(fragment))throw Error('Missing fragment '+val);links++;}for(const m of text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)){if(m[1].trim())new Function(m[1]);}}
for(const p of files.filter(p=>p.endsWith('.js')))new Function(readFileSync(p,'utf8'));
const homepage=readFileSync(resolve(root,'index.html'),'utf8');if([...homepage.matchAll(/data-categories=/g)].length!==10)throw Error('Expected 10 public cases');
const privateRepos=['Change-Management-Platform-BA-UX','RespiraCare-Healthcare-Platform-BA-UX','Business-Decision-Modelling-Analytics','PrototypeShowcase','Enterprise-Systems-SAP-ERP','AI-employment-text-analytics','Daihatsu-IT-Strategy-Governance-Case-Study'];
for(const p of pages){const text=readFileSync(p,'utf8');for(const n of privateRepos)if(text.includes('href="https://github.com/WilliamTangq/'+n))throw Error('Inaccessible private repository CTA: '+p);if(/final-year|graduating (?:in )?December 2026|33940479/.test(text))throw Error('Stale student wording or identifier: '+p);}
console.log(JSON.stringify({pages:pages.length,localLinks:links,projectDestinations:10,javascriptSyntax:'passed',privateRepoCTAs:0}));
