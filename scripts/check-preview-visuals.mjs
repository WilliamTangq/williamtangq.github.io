import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
function testPreviewVisuals(rendererSource,controllerSource) {
  let assertions=0;
  const check=(condition,message)=>{if(!condition)throw new Error(message);assertions++;};
  const runtime={};
  new Function("globalThis","module",rendererSource)(runtime,{exports:{}});
  const visuals=runtime.PortfolioVisuals;
  check(Object.keys(visuals.catalog).length===5,"Five project definitions");
  check(Object.values(visuals.catalog).every(project=>project.scenes.length===3),"Three scenes per project");
  check(visuals.normalizeIndex(-1,3)===2 && visuals.normalizeIndex(3,3)===0,"Scene indexes wrap in both directions");
  check(visuals.normalizeIndex(NaN,3)===0,"Invalid index defaults to zero");
  check(visuals.escapeHTML('<script a="x">&')==="&lt;script a=&quot;x&quot;&gt;&amp;","Dynamic labels are escaped");
  check(visuals.renderScene("missing")==="","Unknown projects render safely");
  const scenes=[];
  for(const [key,project]of Object.entries(visuals.catalog)){
    for(let i=0;i<3;i++){
      const html=visuals.renderScene(key,i);scenes.push(html);
      check(html.includes('role="img"')&&html.includes("illustrative content"),key+" scene has an illustration label");
      check(html.includes(project.scenes[i].title.replaceAll("&","&amp;")),key+" scene has a meaningful accessible description");
      check(html.includes('iv-nav-item is-current'),key+" scene identifies its navigation context");
    }
  }
  check(new Set(scenes).size===15,"All fifteen scenes are distinct");
  check(visuals.renderScene("database",0).includes("FK product_id"),"ERD includes the product reference");
  check(visuals.renderScene("database",1).includes("LEFT JOIN"),"SQL view shows the query");
  check(visuals.renderScene("innerleaf",2).includes("Logged-out visitor"),"Access view includes signed-out routing");
  class Element {
    constructor(attrs={}) {
      this.attrs={...attrs};this.dataset={};this.events={};this.hidden=Object.hasOwn(attrs,"hidden");
      this.tabIndex=0;this.textContent="";this.isConnected=true;this.focusCalls=0;
      for(const [name,value]of Object.entries(attrs))if(name.startsWith("data-"))this.dataset[name.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
      const set=new Set();
      this.classList={add:name=>set.add(name),remove:name=>set.delete(name),contains:name=>set.has(name)};
    }
    setAttribute(name,value){this.attrs[name]=value;}
    getAttribute(name){return this.attrs[name]??null;}
    addEventListener(name,handler){(this.events[name]||=[]).push(handler);}
    fire(name,event={}){const e={target:this,currentTarget:this,...event};(this.events[name]||[]).forEach(fn=>fn(e));}
    focus(){this.focusCalls++;document.activeElement=this;}
  }
  const attributes=source=>Object.fromEntries([...source.matchAll(/([a-z-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
  class Gallery extends Element {
    set innerHTML(html){
      this.html=html;
      this.tabs=[...html.matchAll(/<button type="button" class="iv-tab"([^>]*)>/g)].map(m=>new Element(attributes(m[1])));
      this.panels=[...html.matchAll(/<div class="iv-panel"([^>]*)>/g)].map(m=>{const node=new Element(attributes(m[1]));node.hidden=m[1].includes(" hidden");return node;});
      this.status=new Element();this.prev=new Element();this.next=new Element();this.zoom=html.includes('class="iv-action iv-zoom"')?new Element():null;
    }
    get innerHTML(){return this.html||"";}
    querySelectorAll(selector){return selector===".iv-tab"?this.tabs:selector===".iv-panel"?this.panels:[];}
    querySelector(selector){return {".iv-live-status":this.status,".iv-gallery-prev":this.prev,".iv-gallery-next":this.next,".iv-zoom":this.zoom}[selector]||null;}
    replaceChildren(){this.innerHTML="";}
  }
  class Dialog extends Element {
    constructor(){super();this.open=false;this.showCalls=0;}
    set innerHTML(value){this.html=value;this.closeButton=new Element();this.title=new Element();this.link=new Element();this.gallery=new Gallery();}
    querySelector(selector){return {".iv-modal-close":this.closeButton,".iv-modal-title":this.title,".iv-modal-destination":this.link,".iv-modal-gallery":this.gallery}[selector];}
    showModal(){this.open=true;this.showCalls++;this.closeButton.focus();}
    close(){this.open=false;this.fire("close");}
    getBoundingClientRect(){return {left:10,right:300,top:10,bottom:300};}
  }
  const roots=Object.keys(visuals.catalog).map(key=>new Gallery({"data-iv-gallery":key}));
  const buttons=Object.keys(visuals.catalog).map(key=>{const node=new Element({"data-iv-open":key,hidden:""});return node;});
  const body=new Element();body.children=[];body.appendChild=node=>body.children.push(node);
  const document={body,activeElement:null,createElement:tag=>tag==="dialog"?new Dialog():new Element(),querySelectorAll:selector=>selector==="[data-iv-gallery]"?roots:selector==="[data-iv-open]"?buttons:[]};
  new Function("globalThis","document","module",controllerSource)(runtime,document,{exports:{}});
  const ui=runtime.PortfolioPreviewUI;
  check(buttons.every(button=>!button.hidden),"All five homepage preview buttons are enabled");
  const ids=[];
  roots.forEach(root=>{
    check(root.tabs.length===3&&root.panels.length===3,"Every case gallery mounts all scenes");
    check(root.panels.filter(panel=>!panel.hidden).length===1,"Only one scene is exposed at a time");
    ids.push(...[...root.innerHTML.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
    root.next.fire("click");
    check(root.tabs[1].getAttribute("aria-selected")==="true"&&!root.panels[1].hidden,"Next navigation selects second scene");
    check(root.status.textContent.includes("preview 2 of 3"),"Scene changes are announced");
    let prevented=false;root.tabs[1].fire("keydown",{key:"End",preventDefault(){prevented=true;}});
    check(prevented&&root.tabs[2].focusCalls===1&&!root.panels[2].hidden,"End selects final tab and moves focus");
    root.tabs[2].fire("keydown",{key:"Home",preventDefault(){}});
    root.prev.fire("click");
    check(!root.panels[2].hidden,"Previous wraps from first to final scene");
  });
  check(ids.length===new Set(ids).size,"Gallery IDs stay unique on a combined page");
  roots[0].zoom.fire("click");
  const dialog=body.children.at(-1);
  check(dialog.open&&dialog.showCalls===1,"Expansion uses the native modal API");
  check(!dialog.gallery.panels[2].hidden,"Expansion preserves the selected scene");
  check(dialog.gallery.zoom===null,"Modal has no recursive expand action");
  check(body.classList.contains("iv-modal-open"),"Page scrolling locks while modal is open");
  let cancelPrevented=false;dialog.fire("cancel",{preventDefault(){cancelPrevented=true;}});
  check(cancelPrevented&&!dialog.open&&!body.classList.contains("iv-modal-open"),"Escape cancellation closes and unlocks");
  check(roots[0].zoom.focusCalls===1,"Focus returns to the originating expand button");
  for(const button of buttons){
    button.fire("click");
    check(dialog.open&&dialog.link.href===visuals.catalog[button.dataset.ivOpen].destination,"Homepage preview links to its own case");
    check(dialog.gallery.tabs.length===3&&!dialog.gallery.panels[0].hidden,"Homepage opens a full gallery at the first scene");
    dialog.fire("click",{target:dialog,clientX:100,clientY:100});
    check(dialog.open,"Clicking within dialog bounds does not dismiss it");
    dialog.fire("click",{target:dialog,clientX:0,clientY:0});
    check(!dialog.open&&button.focusCalls===1,"Backdrop dismissal restores focus");
  }
  check(body.children.length===1,"A single modal is reused");
  const runtimeWithoutDialog={PortfolioVisuals:visuals};
  const unsupportedButton=new Element({"data-iv-open":"agencia",hidden:""});
  const fallbackRoot=new Gallery({"data-iv-gallery":"agencia"});
  const fallbackDocument={body:new Element(),createElement:()=>new Element(),querySelectorAll:selector=>selector==="[data-iv-gallery]"?[fallbackRoot]:[unsupportedButton]};
  new Function("globalThis","document","module",controllerSource)(runtimeWithoutDialog,fallbackDocument,{exports:{}});
  check(unsupportedButton.hidden&&fallbackRoot.zoom===null,"Unsupported dialogs retain safe fallback content");
  check(fallbackRoot.tabs.length===3,"Gallery browsing remains available without native dialogs");
  return assertions;
}
const count=testPreviewVisuals(
  readFileSync(resolve(root,"assets/preview-scenes.js"),"utf8"),
  readFileSync(resolve(root,"assets/visual-ui.js"),"utf8")
);
console.log("Passed "+count+" preview rendering and interaction assertions (DOM fixtures).");
console.log("Native browser focus containment and rendered layout require browser QA.");
