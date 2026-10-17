/* Intelligent Visual UI — accessible galleries built from illustrative portfolio data.
   Not screenshots. No client internal assets, telemetry, third-party image calls or API keys. */
(() => {
  "use strict";
  const ICON_ZOOM = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="11" height="11" rx="2"/><path d="m14 10 6-6m-5 0h5v5"/></svg>';
  const ICON_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
  const esc = value => String(value ?? "").replace(/[&<>"']/g, x => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
  const catalog = {
    agencia: {
      brand:"Agencia Change Engine",
      rail:["Overview","Stakeholders","Readiness","Training","Action plan"],
      scenes:[
        {tab:"Workspace",type:"workspace",heading:"Change planning workspace",title:"Making change work easier to coordinate",summary:"An illustrative overview of the shared planning activities supported by the existing platform.",items:[["Identify stakeholders","Review"],["Plan readiness activities","In progress"],["Coordinate training actions","Next"]],signals:[["Ownership","Clear responsibilities"],["Collaboration","Shared plans"],["Follow-up","Activity visibility"]]},
        {tab:"Onboarding",type:"journey",heading:"Getting started",title:"A clearer first-use journey",summary:"My focus: improving the guidance new users receive as they learn where to start.",steps:[["Discover","Find the right entry point"],["Follow guidance","Move through the intended steps"],["Continue","Navigate with confidence"]],hint:"Business requirements → guided interactions → acceptance checks."},
        {tab:"Progress",type:"insights",heading:"Team progress overview",title:"Helping people see what needs attention",summary:"Conceptual visibility for tasks and training activity. The bars are illustrative, not project results.",signals:[["Assignments","Owner + next action"],["Training","Activity-level view"],["Follow-up","Review progress"]],bars:[44,65,51,82,57,70]}
      ]
    },
    tanshift: {
      brand:"TanShift",
      rail:["Dashboard","Schedules","Employees","Requests","Settings"],
      scenes:[
        {tab:"Planning",type:"workspace",heading:"Shift planning",title:"One place to organise the roster",summary:"Illustrative scheduling concept based on the project's workflow and business rules.",items:[["Create a weekly schedule","In progress"],["Review staff availability","Review"],["Confirm assigned shifts","Next"]],signals:[["Planning","Weekly view"],["Staff","Availability"],["Rules","Shift constraints"]]},
        {tab:"Workflow",type:"journey",heading:"Scheduling journey",title:"Business rules before interfaces",summary:"A simple conceptual workflow for a manager preparing and checking a roster.",steps:[["Prepare","Check staffing needs"],["Assign","Work with constraints"],["Review","Verify the schedule"]],hint:"The goal is a predictable rostering process, not a decorative calendar."},
        {tab:"Requests",type:"insights",heading:"Request handling",title:"Making follow-ups easy to see",summary:"An illustrative task overview — no actual employee information or results are shown.",signals:[["Requests","Track status"],["Approvals","Review decisions"],["Coverage","Check changes"]],bars:[35,58,74,54,83,63]}
      ]
    },
    innerleaf: {
      brand:"InnerLeaf",
      rail:["Reflection","History","Insights","My space","Settings"],
      scenes:[
        {tab:"Reflection",type:"workspace",heading:"Personal reflection",title:"From free-form writing to structured reflection",summary:"Illustrative experience showing product structure, not real user journal content.",items:[["Write a reflection","Review"],["Separate facts from interpretation","In progress"],["Consider a practical next step","Next"]],signals:[["Input","Private reflection"],["Output","Structured format"],["UX","Clear next step"]]},
        {tab:"Flow",type:"journey",heading:"Reflection flow",title:"A thoughtful product journey",summary:"Conceptual user flow inspired by the structured reflection experience.",steps:[["Write","Describe an experience"],["Reflect","Review the structured response"],["Continue","Choose a practical prompt"]],hint:"Illustrative UI only. No actual personal reflections or AI outputs."},
        {tab:"Product",type:"insights",heading:"Product considerations",title:"Designing for quality and clarity",summary:"A conceptual visual of testing priorities, not a performance claim.",signals:[["Roles","User / admin"],["Data","Authentication"],["QA","Acceptance tests"]],bars:[68,57,74,63,80,54]}
      ]
    },
    database: {
      brand:"Database & SQL",
      rail:["Business rules","Entities","Relationships","Queries","Validation"],
      scenes:[
        {tab:"Data model",type:"workspace",heading:"Relational model",title:"Turning business rules into clean data",summary:"Illustrative modelling board. No proprietary source schema is disclosed.",items:[["Identify entities and relationships","Review"],["Define primary and foreign keys","In progress"],["Check normalisation","Next"]],signals:[["Design","ERD"],["Integrity","Keys + rules"],["Querying","Oracle SQL"]]},
        {tab:"Method",type:"journey",heading:"Modelling process",title:"From the requirement to the database",summary:"A process diagram showing how a database design is reasoned through.",steps:[["Understand","Capture rules"],["Model","Map entities"],["Validate","Test queries"]],hint:"Structure and data integrity matter more than writing queries quickly."},
        {tab:"Validation",type:"insights",heading:"Query and integrity checks",title:"Checking the relationships",summary:"Illustrative evidence map, not measured test coverage.",signals:[["Schema","Normalisation"],["Keys","Referential integrity"],["Queries","Expected results"]],bars:[42,64,78,57,74,68]}
      ]
    },
    cstan: {
      brand:"CS TAN · Business Operations",
      rail:["Operations","Inventory","Sales","Customers","Documentation"],
      scenes:[
        {tab:"Operations",type:"workspace",heading:"Business operations",title:"Technology grounded in real daily work",summary:"Conceptual workflow based on business operations experience; no private supplier or customer information is shown.",items:[["Review sales and stock movement","Review"],["Prepare quotations and invoices","In progress"],["Coordinate customer requests","Next"]],signals:[["Analysis","Excel"],["Business","B2B support"],["Process","Digital records"]]},
        {tab:"Workflow",type:"journey",heading:"Order coordination",title:"A practical customer workflow",summary:"How information can move through recurring commercial activities.",steps:[["Enquiry","Understand the need"],["Coordinate","Source and quote"],["Record","Track the documents"]],hint:"Illustrative only. This does not expose customer orders, prices or supplier records."},
        {tab:"Analysis",type:"insights",heading:"Operational analysis",title:"Connecting information to decisions",summary:"Sample chart shapes only, not real sales, margin or inventory figures.",signals:[["Stock","Movement"],["Sales","Trends"],["Purchasing","Decision support"]],bars:[60,41,82,67,56,72]}
      ]
    }
  };
  const modal = document.createElement("div");
  modal.className = "iv-modal"; modal.hidden = true;
  modal.innerHTML = '<div class="iv-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="iv-modal-title" tabindex="-1"><div class="iv-modal-bar"><span id="iv-modal-title" class="iv-modal-title">Visual preview</span><button type="button" class="iv-action iv-modal-close" aria-label="Close preview">✕</button></div><div class="iv-modal-content"></div><div class="iv-modal-footer"><span>Illustrative visual · not a product screenshot</span><a class="iv-modal-destination" href="./#projects">Read case study →</a></div></div>';
  document.body.appendChild(modal);
  const dialog = modal.querySelector(".iv-modal-dialog"), content = modal.querySelector(".iv-modal-content");
  const destination = modal.querySelector(".iv-modal-destination");
  const titleNode = modal.querySelector("#iv-modal-title");
  let returnFocus = null;
  const openModal = (node, title, url, trigger) => {
    returnFocus = trigger || document.activeElement;
    content.replaceChildren(node);
    titleNode.textContent = title;
    destination.href = url || "./#projects";
    destination.hidden = !url;
    modal.hidden = false;
    document.body.classList.add("iv-modal-open");
    dialog.focus();
  };
  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("iv-modal-open");
    content.replaceChildren();
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  };
  modal.addEventListener("click", event => {
    if (event.target === modal || event.target.closest(".iv-modal-close")) closeModal();
  });
  document.addEventListener("keydown", event => {
    if (modal.hidden) return;
    if (event.key === "Escape") {event.preventDefault();closeModal();return;}
    if (event.key !== "Tab") return;
    const tabbable = [...dialog.querySelectorAll('a[href]:not([hidden]),button:not([disabled]):not([hidden])')].filter(n => n.getClientRects().length);
    if (!tabbable.length) {event.preventDefault();dialog.focus();return;}
    const first=tabbable[0], last=tabbable[tabbable.length-1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });

  function workView(scene) {
    return '<div class="iv-primary-cards"><div class="iv-workcard"><h3>Activities</h3><p>Example tasks · sample state</p>'
    + scene.items.map(([name,status],i)=>'<div class="iv-work-item"><span class="iv-work-icon">'+(i+1)+'</span><b>'+esc(name)+'</b><span class="iv-work-status '+(status==="Review"?"done":status==="Next"?"next":"")+'">'+esc(status)+'</span></div>').join("")
    + '</div><div class="iv-workcard"><h3>At a glance</h3>'+scene.signals.map(([k,v])=>'<div class="iv-signal"><span>'+esc(k)+'</span><strong>'+esc(v)+'</strong></div>').join("")
    +'<div class="iv-progress-track" aria-hidden="true"><div class="iv-progress-fill"></div></div><p style="margin-top:8px">Decorative indicator only</p></div></div>';
  }
  function journeyView(scene) {
    return '<div class="iv-timeline">'+scene.steps.map(([t,d],i)=>'<div class="iv-step '+(i===1?"featured":"")+'"><span class="iv-step-num">'+(i+1)+'</span><strong>'+esc(t)+'</strong><small>'+esc(d)+'</small></div>').join("")
    +'</div><div class="iv-small-band">'+esc(scene.hint)+'</div>';
  }
  function insightView(scene) {
    return '<div class="iv-insight-grid"><div class="iv-workcard"><h3>Illustrative activity view</h3><div class="iv-bars" aria-hidden="true">'+scene.bars.map((h,i)=>'<div class="iv-bar" style="--h:'+h+'%" data-label="'+(i+1)+'"></div>').join("")
    +'</div></div><div class="iv-workcard"><h3>Areas of focus</h3>'+scene.signals.map(([k,v])=>'<div class="iv-signal"><span>'+esc(k)+'</span><strong>'+esc(v)+'</strong></div>').join("")
    +'<p style="margin-top:12px">Conceptual information only</p></div></div>';
  }
  function renderScene(d,scene) {
    const body=scene.type==="workspace"?workView(scene):scene.type==="journey"?journeyView(scene):insightView(scene);
    return '<div class="iv-screen" role="img" aria-label="'+esc(scene.title)+'. Illustrative mock interface, not a screenshot">'
      +'<div class="iv-browser"><span class="iv-browser-dots"><i></i><i></i><i></i></span><span class="iv-browser-label">Visual concept · sample content</span></div>'
      +'<div class="iv-window"><div class="iv-rail"><div class="iv-brand">'+esc(d.brand)+'</div>'
      +d.rail.map((s,i)=>'<div class="iv-railitem '+(i===0?"active":"")+'">'+esc(s)+'</div>').join("")
      +'</div><div class="iv-screen-body"><div class="iv-screen-head"><strong>'+esc(scene.heading)+'</strong><span class="iv-demo-label">Illustration</span></div>'+body
      +'</div></div></div>';
  }
  document.querySelectorAll("[data-iv-gallery]").forEach((root,galleryNum) => {
    const d=catalog[root.getAttribute("data-iv-gallery")];
    if(!d)return;
    root.textContent="";
    let active=0;
    const tabs=d.scenes.map((scene,i)=>'<button type="button" class="iv-tab" id="iv-tab-'+galleryNum+'-'+i+'" role="tab" aria-controls="iv-panel-'+galleryNum+'-'+i+'" aria-selected="'+(i===0)+'" tabindex="'+(i===0?0:-1)+'">'+esc(scene.tab)+'</button>').join("");
    const panels=d.scenes.map((scene,i)=>'<div class="iv-panel" id="iv-panel-'+galleryNum+'-'+i+'" role="tabpanel" aria-labelledby="iv-tab-'+galleryNum+'-'+i+'" '+(i===0?"":"hidden")+'>'
      +'<div class="iv-stage">'+renderScene(d,scene)+'</div>'
      +'<div class="iv-gallery-caption"><div><h3>'+esc(scene.title)+'</h3><p>'+esc(scene.summary)+'</p></div><span class="iv-counter">'+(i+1)+' / '+d.scenes.length+'</span></div></div>').join("");
    root.innerHTML='<div class="iv-topline"><div class="iv-tabs" role="tablist" aria-label="'+esc(d.brand)+' visual stories">'+tabs+'</div>'
      +'<div class="iv-actions"><button type="button" class="iv-action iv-gallery-prev" aria-label="Previous visual">'+ICON_ARROW+'</button>'
      +'<button type="button" class="iv-action iv-gallery-next" aria-label="Next visual">'+ICON_ARROW.replace('m15 18-6-6 6-6','m9 18 6-6-6-6')+'</button>'
      +'<button type="button" class="iv-action iv-zoom">'+ICON_ZOOM+'<span>Expand</span></button></div></div>'
      +'<div class="iv-panels">'+panels+'</div>';
    const btns=[...root.querySelectorAll(".iv-tab")],pans=[...root.querySelectorAll(".iv-panel")];
    function choose(i,focus) {
      active=(i+d.scenes.length)%d.scenes.length;
      btns.forEach((t,k)=>{const on=k===active;t.setAttribute("aria-selected",String(on));t.tabIndex=on?0:-1; pans[k].hidden=!on;});
      if(focus)btns[active].focus();
    }
    btns.forEach((t,i)=>{t.addEventListener("click",()=>choose(i,false));t.addEventListener("keydown",e=>{
      if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){e.preventDefault();choose(e.key==="Home"?0:e.key==="End"?d.scenes.length-1:active+(e.key==="ArrowRight"?1:-1),true);}
    });});
    root.querySelector(".iv-gallery-prev").addEventListener("click",()=>choose(active-1,false));
    root.querySelector(".iv-gallery-next").addEventListener("click",()=>choose(active+1,false));
    root.querySelector(".iv-zoom").addEventListener("click",e=>{
      const show=document.createElement("div");show.className="iv-stage";show.innerHTML=renderScene(d,d.scenes[active]);
      openModal(show, d.brand+" · "+d.scenes[active].tab,document.querySelector('link[rel="canonical"]')?.href||location.pathname,e.currentTarget);
    });
    let startX=0;
    root.querySelector(".iv-panels").addEventListener("touchstart",e=>{startX=e.changedTouches[0]?.screenX||0},{passive:true});
    root.querySelector(".iv-panels").addEventListener("touchend",e=>{const dx=(e.changedTouches[0]?.screenX||0)-startX;if(Math.abs(dx)>70)choose(active+(dx<0?1:-1),false)},{passive:true});
  });
  document.querySelectorAll("#projects .project-card").forEach(card => {
    const visual=card.querySelector(".project-visual"), anchor=card.querySelector('a.project-link'), heading=card.querySelector("h3");
    if(!visual || !heading || !anchor)return;
    const button=document.createElement("button");
    button.className="iv-preview-trigger";button.type="button";
    button.innerHTML=ICON_ZOOM+"<span>Preview visual</span>";
    button.setAttribute("aria-label","Preview visual illustration for "+heading.textContent.trim());
    visual.appendChild(button);
    button.addEventListener("click",()=> {
      const clone=visual.cloneNode(true);
      clone.querySelectorAll(".iv-preview-trigger").forEach(n=>n.remove());
      const holder=document.createElement("div");holder.className="iv-home-preview-shell";
      const wrapper=document.createElement("article");wrapper.className=card.className.replace(/\breveal\b/g,"").trim();wrapper.appendChild(clone);holder.appendChild(wrapper);
      const safeUrl=anchor.getAttribute("href");
      openModal(holder,heading.textContent.trim(),safeUrl,button);
    });
  });
})();