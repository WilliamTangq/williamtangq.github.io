import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = new Map();
function walk(directory) {
  for (const entry of readdirSync(directory, {withFileTypes:true})) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const path = resolve(directory,entry.name);
    if (entry.isDirectory()) walk(path);
    else files.set(relative(root,path).replaceAll("\\","/"),path);
  }
}
walk(root);
let links = 0, pages = 0;
const idsFor = html => [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
const pagesByPath = new Map([...files].filter(([path])=>path.endsWith(".html")).map(([path,absolute])=>[path,readFileSync(absolute,"utf8")]));
function check(condition,message){if(!condition)throw new Error(message);}
const voidTags = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
for (const [path,html] of pagesByPath) {
  pages++;
  const ids = idsFor(html);
  check(ids.length===new Set(ids).size,path+": duplicate IDs");
  check([...html.matchAll(/<h1\b/gi)].length===1,path+": expected one h1");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href=match[1];
    if (/^(?:[a-z]+:|\/\/)/i.test(href)) continue;
    const [part,hash]=href.split("#");
    const target=part ? (part==="./"?"index.html":part.replace(/^\.\//,"")) : path;
    check(files.has(target),path+": missing local destination "+href);
    if(hash&&pagesByPath.has(target))check(idsFor(pagesByPath.get(target)).includes(hash),path+": missing fragment "+href);
    links++;
  }
  if(path==="index.html"||path.startsWith("case-")){
    const stack=[];
    const clean=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"");
    for(const match of clean.matchAll(/<(\/?)([a-z][a-z0-9-]*)\b([^>]*)>/gi)){
      const [,closing,tag,attrs]=match;
      if(closing)check(stack.pop()===tag,path+": unbalanced closing "+tag);
      else if(!voidTags.has(tag)&&!attrs.trim().endsWith("/"))stack.push(tag);
    }
    check(stack.length===0,path+": unclosed tags");
  }
}
for (const [path,absolute] of files) if(path.endsWith(".js")) new Function(readFileSync(absolute,"utf8"));
function testInteractions(source, html) {
  let assertions = 0;
  const check = (condition, message) => { if (!condition) throw new Error(message); assertions++; };
  class Element {
    constructor(attributes = {}, text = "") {
      this.attributes = {...attributes}; this.textContent = text; this.hidden = false; this.dataset = {};
      Object.entries(attributes).forEach(([name,value]) => {
        if(name.startsWith("data-")) this.dataset[name.slice(5).replace(/-([a-z])/g, (_,c)=>c.toUpperCase())] = value;
      });
      this.classes = new Set(); this.events = {}; this.focused = false;
      this.classList = { add: name => this.classes.add(name), toggle: (name,on) => {if(on)this.classes.add(name);else this.classes.delete(name);} };
    }
    setAttribute(name,value){this.attributes[name]=value;}
    getAttribute(name){return this.attributes[name] ?? null;}
    removeAttribute(name){delete this.attributes[name];}
    addEventListener(name,fn){(this.events[name] ||= []).push(fn);}
    fire(name,event={}){(this.events[name]||[]).forEach(fn=>fn(event));}
    focus(){this.focused=true;}
  }
  const cards=[...html.matchAll(/<article class="work-card[^"]*" data-categories="([^"]+)"/g)].map(m=>new Element({"data-categories":m[1]}));
  const filters=[...html.matchAll(/<button type="button" data-filter="([^"]+)" aria-pressed="([^"]+)">([^<]+)<\/button>/g)].map(m=>new Element({"data-filter":m[1],"aria-pressed":m[2]},m[3]));
  check(cards.length===5 && filters.length===4,"Expected five cards and four filters from actual markup");
  const menu=new Element({"aria-expanded":"false"}), nav=new Element(), controls=new Element(), status=new Element();
  const sections=["projects","professional-spectrum","experience","career-passport"].map(id=>new Element({id}));
  sections.forEach((section,index)=>section.id=["projects","professional-spectrum","experience","career-passport"][index]);
  const links=sections.map(section=>new Element({"data-section":section.id}));
  let observerCallback;
  const document = new Element();
  document.documentElement = new Element();
  document.querySelector = selector => selector===".menu-toggle"?menu:null;
  document.querySelectorAll = selector => ({"[data-categories]":cards,"[data-filter]":filters,"[data-section]":links}[selector] || []);
  document.getElementById = id => ({"primary-nav":nav,"work-controls":controls,"work-status":status}[id] || sections.find(section=>section.id===id));
  const target = (inside,anchor=false) => ({closest: selector => selector==="a" ? anchor : selector===".site-header" ? inside : null});
  const window = {IntersectionObserver:true};
  class IntersectionObserver {constructor(callback){observerCallback=callback;}observe(){}}
  new Function("document","window","IntersectionObserver",source)(document,window,IntersectionObserver);
  check(document.documentElement.classes.has("menu-ready")&&!menu.hidden,"Menu enhancement activated");
  for(const [category,count] of [["analysis",3],["systems",4],["data",2],["all",5]]){
    const filter=filters.find(button=>button.dataset.filter===category);filter.fire("click");
    check(cards.filter(card=>!card.hidden).length===count,"Wrong filter result: "+category);
    check(filters.filter(button=>button.getAttribute("aria-pressed")==="true").length===1 && filter.getAttribute("aria-pressed")==="true","Filter selection must be exclusive");
    check(status.textContent.startsWith(count+" projects"),"Live status must reflect visible cards");
  }
  menu.fire("click");check(menu.getAttribute("aria-expanded")==="true"&&nav.classes.has("is-open"),"Menu opens");
  let prevented=false;
  document.fire("keydown",{key:"Escape",preventDefault(){prevented=true;}});
  check(prevented&&menu.focused&&menu.getAttribute("aria-expanded")==="false"&&!nav.classes.has("is-open"),"Escape closes menu and returns focus");
  menu.fire("click");nav.fire("click",{target:target(true,true)});check(menu.getAttribute("aria-expanded")==="false","Navigation closes menu");
  menu.fire("click");document.fire("click",{target:target(false)});check(menu.getAttribute("aria-expanded")==="false","Outside click closes menu");
  observerCallback([{target:sections[0],isIntersecting:true}]);check(links[0].getAttribute("aria-current")==="location","Active section announced");
  observerCallback([{target:sections[0],isIntersecting:false},{target:sections[2],isIntersecting:true}]);
  check(links[0].getAttribute("aria-current")===null&&links[2].getAttribute("aria-current")==="location","Active section updates");
  check(new Function("document","window",source)({querySelector:()=>null,getElementById:()=>null,querySelectorAll:()=>[]},{})===undefined,"Optional features can be absent");
  return assertions;
}
const assertions=testInteractions(readFileSync(resolve(root,"assets/portfolio.js"),"utf8"),pagesByPath.get("index.html"));
console.log("Passed: "+pages+" pages, "+links+" local links/assets, HTML nesting, JS syntax and "+assertions+" interaction assertions (DOM fixtures).");
console.log("Browser rendering, viewport behaviour and real keyboard navigation require browser QA.");
