/* Tabs and native modal navigation for the shared interface studies. */
(function (scope) {
  "use strict";
  const visuals=scope.PortfolioVisuals;
  if(!visuals)return;
  const arrow=direction=>'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (direction==="left"?"m14 6-6 6 6 6":"m10 6 6 6-6 6") + '"/></svg>';
  const expand='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/></svg>';
  let sequence=0;
  let modal=null,modalGallery=null,returnFocus=null;
  const doc=typeof document!=="undefined"?document:null;
  const supportsDialog=!!doc && typeof doc.createElement("dialog").showModal==="function";
  function galleryMarkup(key,id,allowExpand=true) {
    const project=visuals.catalog[key];
    if(!project)return "";
    const e=visuals.escapeHTML;
    const tabs=project.scenes.map((scene,i)=>'<button type="button" class="iv-tab" id="' + id + '-tab-' + i + '" role="tab" aria-controls="' + id + '-panel-' + i + '" aria-selected="' + (i===0) + '" tabindex="' + (i===0?0:-1) + '">' + e(scene.tab) + '</button>').join("");
    const panels=project.scenes.map((scene,i)=>'<div class="iv-panel" id="' + id + '-panel-' + i + '" role="tabpanel" aria-labelledby="' + id + '-tab-' + i + '"' + (i===0?"":" hidden") + '><div class="iv-stage iv-theme-' + project.theme + '" tabindex="0" role="group" aria-label="' + e(scene.tab + " interface study. Wide tables and diagrams can be scrolled horizontally.") + '">' + visuals.renderScene(key,i) + '</div><div class="iv-gallery-caption"><div><h3>' + e(scene.title) + '</h3><p>' + e(scene.summary) + '</p></div><span class="iv-counter" aria-hidden="true">0' + (i+1) + ' / 0' + project.scenes.length + '</span></div></div>').join("");
    return '<div class="iv-topline"><div class="iv-tabs" role="tablist" aria-label="' + e(project.brand + " interface studies") + '">' + tabs + '</div><div class="iv-actions"><button type="button" class="iv-action iv-gallery-prev" aria-label="Previous preview">' + arrow("left") + '</button><button type="button" class="iv-action iv-gallery-next" aria-label="Next preview">' + arrow("right") + '</button>' + (allowExpand?'<button type="button" class="iv-action iv-zoom" aria-haspopup="dialog">' + expand + '<span>Expand</span></button>':"") + '</div></div><div class="iv-panels">' + panels + '</div><div class="iv-sr-only iv-live-status" role="status" aria-live="polite" aria-atomic="true"></div>';
  }
  function mountGallery(root,key,options={}) {
    const project=visuals.catalog[key];
    if(!project || !root)return null;
    const id="iv-gallery-" + sequence++;
    root.classList.add("iv-theme-" + project.theme);
    root.innerHTML=galleryMarkup(key,id,options.allowExpand!==false && supportsDialog);
    const tabs=[...root.querySelectorAll(".iv-tab")],panels=[...root.querySelectorAll(".iv-panel")];
    const status=root.querySelector(".iv-live-status");
    let active=0;
    function select(index,focus=false,announce=true) {
      active=visuals.normalizeIndex(index,project.scenes.length);
      tabs.forEach((tab,i)=>{
        const on=i===active;
        tab.setAttribute("aria-selected",String(on));
        tab.tabIndex=on?0:-1;
        panels[i].hidden=!on;
      });
      if(focus)tabs[active].focus();
      if(announce)status.textContent=project.scenes[active].tab + ", preview " + (active+1) + " of " + project.scenes.length;
    }
    tabs.forEach((tab,i)=>{
      tab.addEventListener("click",()=>select(i));
      tab.addEventListener("keydown",event=>{
        if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
        event.preventDefault();
        select(event.key==="Home"?0:event.key==="End"?project.scenes.length-1:active+(event.key==="ArrowRight"?1:-1),true);
      });
    });
    root.querySelector(".iv-gallery-prev").addEventListener("click",()=>select(active-1));
    root.querySelector(".iv-gallery-next").addEventListener("click",()=>select(active+1));
    root.querySelector(".iv-zoom")?.addEventListener("click",event=>openPreview(key,active,event.currentTarget));
    select(options.initial||0,false,false);
    return {select,get index(){return active;}};
  }
  function ensureModal() {
    if(modal || !supportsDialog)return;
    modal=doc.createElement("dialog");
    modal.className="iv-modal";
    modal.setAttribute("aria-labelledby","iv-modal-title");
    modal.innerHTML='<div class="iv-modal-header"><div><span class="iv-modal-overline">Project / Interface studies</span><h2 class="iv-modal-title" id="iv-modal-title">Visual preview</h2></div><button type="button" class="iv-action iv-modal-close" aria-label="Close visual preview" autofocus>×</button></div><div class="iv-modal-content"><div class="iv-modal-gallery"></div></div><div class="iv-modal-footer"><span>Original interface studies · illustrative content</span><a class="iv-modal-destination" href="./#projects">Read case study <span aria-hidden="true">→</span></a></div>';
    doc.body.appendChild(modal);
    modalGallery=modal.querySelector(".iv-modal-gallery");
    modal.querySelector(".iv-modal-close").addEventListener("click",()=>modal.close());
    modal.addEventListener("cancel",event=>{event.preventDefault();modal.close();});
    modal.addEventListener("click",event=>{
      if(event.target!==modal)return;
      const bounds=modal.getBoundingClientRect();
      if(event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom)modal.close();
    });
    modal.addEventListener("close",()=>{
      doc.body.classList.remove("iv-modal-open");
      modalGallery.replaceChildren();
      if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
      returnFocus=null;
    });
  }
  function openPreview(key,index=0,trigger=null) {
    const project=visuals.catalog[key];
    if(!project || !supportsDialog)return;
    ensureModal();
    returnFocus=trigger||doc.activeElement;
    modal.querySelector(".iv-modal-title").textContent=project.brand;
    modal.querySelector(".iv-modal-destination").href=project.destination;
    mountGallery(modalGallery,key,{initial:index,allowExpand:false});
    doc.body.classList.add("iv-modal-open");
    if(!modal.open)modal.showModal();
  }
  function mount() {
    if(!doc)return;
    doc.querySelectorAll("[data-iv-gallery]").forEach(root=>mountGallery(root,root.dataset.ivGallery));
    if(supportsDialog)doc.querySelectorAll("[data-iv-open]").forEach(button=>{
      if(!visuals.catalog[button.dataset.ivOpen])return;
      button.addEventListener("click",()=>openPreview(button.dataset.ivOpen,0,button));
      button.hidden=false;
    });
  }
  const api={galleryMarkup,mountGallery,openPreview,mount};
  if(typeof module!=="undefined" && module.exports)module.exports=api;
  scope.PortfolioPreviewUI=api;
  if(doc)mount();
})(typeof globalThis!=="undefined"?globalThis:this);
