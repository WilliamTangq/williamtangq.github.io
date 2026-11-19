/* Project galleries: original work, team artefacts and simulations are labelled separately. */
(()=>{
"use strict";
const galleries={
  "agencia": [
    {
      "src": "assets/work/agencia/getting-started.webp",
      "title": "Getting Started: one clear next step",
      "kind": "Actual system · My BA/UX focus",
      "caption": "An eight-step journey makes the next action, prerequisites and saved client visible. This is the onboarding area I focused on; 13% is the captured account progress, not a measured improvement."
    },
    {
      "src": "assets/work/agencia/team-showcase.webp",
      "title": "Team 188 project showcase",
      "kind": "Original event photo · 29 October 2026",
      "caption": "The team presented Agencia Change Engine at the showcase. The display lists William Tan as Business Analyst. This photo documents the team presentation."
    },
    {
      "src": "assets/work/agencia/stakeholder-matrix.webp",
      "title": "Stakeholder impact and influence",
      "kind": "Actual system · Team context",
      "caption": "The matrix explains how impact and influence inform engagement strategies. This empty workspace illustrates the wider change-planning context for onboarding."
    },
    {
      "src": "assets/work/agencia/version-history.webp",
      "title": "Risk and issue version history",
      "kind": "Actual system · Team context",
      "caption": "A captured history view exposes a saved edit and a restore action. This is a team-platform capability, shown as context rather than individual authorship."
    },
    {
      "src": "assets/work/agencia/readiness-dashboard.webp",
      "title": "Project readiness dashboard",
      "kind": "Actual system · Team context",
      "caption": "Readiness, actions and status filters bring planning information into one view. The screenshot contains no readiness records; its 0% is an empty-state value."
    },
    {
      "src": "assets/work/agencia/transition-handover.webp",
      "title": "Transition and handover planning",
      "kind": "Actual system · Team context",
      "caption": "The handover view connects readiness, deliverables and follow-through. Values and Not started labels belong to the captured test workspace."
    }
  ],
  "analytics": [
    {
      "src": "assets/work/transport.png",
      "title": "Shipping allocation and cost",
      "kind": "Recomputed model",
      "caption": "Coursework inputs independently recomputed; modelled differences are not realised business savings."
    },
    {
      "src": "assets/work/inventory.png",
      "title": "Inventory policy",
      "kind": "Recomputed model",
      "caption": "Order quantities before and after the source storage constraint."
    },
    {
      "src": "assets/work/forecast.png",
      "title": "Trend and additive fit",
      "kind": "Recomputed model",
      "caption": "Six observations; extrapolation does not establish future forecast accuracy."
    },
    {
      "src": "assets/work/production-capacity.png",
      "title": "Production bottleneck",
      "kind": "Recomputed model",
      "caption": "Resource use under the selected academic product-mix model."
    },
    {
      "src": "assets/work/decision-emv.png",
      "title": "Market-test decision",
      "kind": "Recomputed model",
      "caption": "Expected values under the coursework scenario assumptions."
    }
  ],
  "planning": [
    {
      "src": "assets/work/planning-sketch.webp",
      "title": "My availability and voting sketches",
      "kind": "Original individual work",
      "caption": "William\u2019s hand-drawn low-fidelity coursework concept."
    },
    {
      "src": "assets/work/planning-explore.webp",
      "title": "Explore and filter screens",
      "kind": "Team prototype",
      "caption": "Original annotated Team Pikachu high-fidelity report excerpt; team design, not sole authorship."
    },
    {
      "src": "assets/work/planning-calendar.webp",
      "title": "Calendar and event detail",
      "kind": "Team prototype",
      "caption": "Original annotated Team Pikachu high-fidelity report excerpt."
    }
  ],
  "erp": [
    {
      "src": "assets/work/erp-sensitivity.png",
      "title": "ERP ranking sensitivity",
      "kind": "Recomputed coursework",
      "caption": "Different weight assumptions change the academic ranking; not a vendor benchmark."
    },
    {
      "src": "assets/work/erp-financial.png",
      "title": "Business-case economics",
      "kind": "Recomputed coursework",
      "caption": "Rebuilt from student cost assumptions. Original financial estimates were a teammate\u2019s contribution."
    },
    {
      "src": "assets/work/erp-workflow.svg",
      "title": "From transactions to a decision",
      "kind": "Workflow summary",
      "caption": "An explanatory teaching-workflow summary, not a live SAP screen."
    }
  ],
  "respira": [
    {
      "src": "assets/work/health-booking-sim.svg",
      "title": "One booking across three roles",
      "kind": "Simulation",
      "caption": "Fictional example that explains the documented appointment workflow."
    },
    {
      "src": "assets/work/health-access-sim.svg",
      "title": "Role and data boundaries",
      "kind": "Simulation",
      "caption": "Intended access boundaries; this visual does not verify server-side controls."
    },
    {
      "src": "assets/work/respira-workflow.svg",
      "title": "Connected care coordination",
      "kind": "Workflow summary",
      "caption": "Portfolio summary of the team\u2019s documented tasks."
    }
  ],
  "shift": [
    {
      "src": "assets/work/roster-sim.svg",
      "title": "Weekly schedule",
      "kind": "Simulation",
      "caption": "Fictional staff assignments illustrate the prototype\u2019s draft/published workflow."
    },
    {
      "src": "assets/work/requests-sim.svg",
      "title": "Leave and shift requests",
      "kind": "Simulation",
      "caption": "An interface study using fictional request records."
    }
  ],
  "leaf": [
    {
      "src": "assets/work/reflection-sim.svg",
      "title": "Structured reflection",
      "kind": "Simulation",
      "caption": "Fictional reflection content; not a user record or a therapy recommendation."
    },
    {
      "src": "assets/work/reflection-access-sim.svg",
      "title": "Role-routing review",
      "kind": "Simulation",
      "caption": "Illustrative scenarios that explain the source repository\u2019s access tests."
    }
  ],
  "analytics-r": [
    {
      "src": "assets/work/text-clustering.png",
      "title": "Document clustering",
      "kind": "Recomputed coursework",
      "caption": "Cosine-distance clustering from the retained matrix; genre separation is descriptive."
    },
    {
      "src": "assets/work/text-terms.png",
      "title": "Retained vocabulary",
      "kind": "Recomputed coursework",
      "caption": "Aggregated stem frequencies from the 20-document matrix snapshot."
    },
    {
      "src": "assets/work/text-corpus.png",
      "title": "The selected corpus",
      "kind": "Recomputed coursework",
      "caption": "Genre counts and document lengths; raw article text is not reproduced."
    }
  ],
  "governance": [
    {
      "src": "assets/work/governance-workflow.svg",
      "title": "Approval evidence workflow",
      "kind": "Academic proposal",
      "caption": "New summary of proposed controls; not an implemented business process."
    },
    {
      "src": "assets/work/control-sim.svg",
      "title": "Risk-to-control register",
      "kind": "Simulation",
      "caption": "Illustrative register connecting risk, proposed control and review evidence."
    }
  ],
  "database": [
    {
      "src": "assets/work/schema-sim.svg",
      "title": "Representative relational model",
      "kind": "Simulation",
      "caption": "Illustrative commerce relationships, not an original assessed university schema."
    },
    {
      "src": "assets/work/sql-sim.svg",
      "title": "From relationships to a query",
      "kind": "Simulation",
      "caption": "A representative query pattern, not live data or an executed result."
    }
  ]
};
let dialog=null,currentProject=null,currentIndex=0,opener=null;
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
function createDialog(){
 dialog=make('dialog','vs-zoom-dialog');dialog.setAttribute('aria-labelledby','vs-dialog-title');dialog.setAttribute('aria-describedby','vs-dialog-caption');
 const header=make('div','vs-dialog-header'),title=make('h2','','Project visuals');title.id='vs-dialog-title';const close=make('button','vs-button','Close');close.type='button';close.addEventListener('click',()=>dialog.close());header.append(title,close);
 const image=make('img','vs-dialog-image');image.id='vs-dialog-image';image.alt='';
 const footer=make('div','vs-dialog-footer'),copy=make('div'),meta=make('div','vs-dialog-meta');meta.id='vs-dialog-meta';const caption=make('p');caption.id='vs-dialog-caption';copy.append(meta,caption);
 const controls=make('div','vs-dialog-controls'),prev=make('button','vs-button','Previous'),next=make('button','vs-button','Next'),count=make('span','vs-dialog-meta');count.id='vs-dialog-count';count.setAttribute('aria-live','polite');
 for(const b of [prev,next])b.type='button';prev.addEventListener('click',()=>show(-1));next.addEventListener('click',()=>show(1));controls.append(prev,count,next);footer.append(copy,controls);dialog.append(header,image,footer);document.body.append(dialog);
 dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus();});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(e.key==='ArrowLeft'?-1:1);}});
}
function show(delta=0){const list=galleries[currentProject];currentIndex=(currentIndex+delta+list.length)%list.length;const v=list[currentIndex];dialog.querySelector('#vs-dialog-title').textContent=v.title;const img=dialog.querySelector('#vs-dialog-image');img.src=v.src;img.alt=v.title;dialog.querySelector('#vs-dialog-meta').textContent=v.kind;dialog.querySelector('#vs-dialog-caption').textContent=v.caption;dialog.querySelector('#vs-dialog-count').textContent=(currentIndex+1)+' / '+list.length;}
document.querySelectorAll('[data-vs-project]').forEach(link=>link.addEventListener('click',event=>{
 if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 if(typeof HTMLDialogElement==='undefined')return;
 event.preventDefault();opener=link;currentProject=link.dataset.vsProject;currentIndex=Number(link.dataset.vsIndex)||0;if(!dialog)createDialog();show();dialog.showModal();
}));
// Exact solution for this balanced two-depot transport model: start from all depot 2 flow,
// then allocate depot 1 supply in ascending incremental cost order. Not a generic LP solver.
function solveShipping(rate){const demand=[350,400,500,350],a=[4,6,9,7],b=[5,4,rate,8];const order=demand.map((_,j)=>j).sort((i,j)=>(a[i]-b[i])-(a[j]-b[j])||i-j);const x=[0,0,0,0];let remaining=700;for(const j of order){x[j]=Math.min(remaining,demand[j]);remaining-=x[j];}const y=demand.map((d,j)=>d-x[j]);return {plan:[x,y],cost:x.reduce((s,q,j)=>s+q*a[j]+y[j]*b[j],0)};}
const shipping=document.querySelector('[data-vs-demo="shipping"]');
if(shipping){const rate=shipping.querySelector('#vs-rate');const render=()=>{const n=Number(rate.value),result=solveShipping(n);shipping.querySelector('#vs-rate-value').textContent='$'+n.toFixed(2);shipping.querySelector('#vs-cost').textContent=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(result.cost);shipping.querySelector('#vs-cost-note').textContent=n===6?'At the original $6 rate.':'Re-optimised at the selected rate. All store demands remain met.';for(let i=0;i<2;i++)for(let j=0;j<4;j++){const cell=shipping.querySelector('[data-vs-flow="'+i+'-'+j+'"]');cell.textContent=result.plan[i][j];cell.style.backgroundColor=result.plan[i][j]?'#e7effa':'';}};rate.addEventListener('input',render);shipping.querySelector('[data-vs-reset-shipping]').addEventListener('click',()=>{rate.value=6;render();});render();shipping.hidden=false;}
const booking=document.querySelector('[data-vs-demo="booking"]');
if(booking){let role='patient',confirmed=false;const tabs=[...booking.querySelectorAll('[data-vs-role]')],accept=booking.querySelector('[data-vs-accept]');const views={patient:['My appointment request','Review the state of the request you submitted.'],clinician:['Review an appointment request','Accept the fictional request to show the patient-facing state update.'],admin:['Coordinate an appointment','See the shared booking state from an operational perspective.']};const render=()=>{for(const t of tabs){const active=t.dataset.vsRole===role;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;}booking.querySelector('#vs-role-panel').setAttribute('aria-labelledby','vs-role-'+role);booking.querySelector('#vs-role-title').textContent=views[role][0];booking.querySelector('#vs-role-description').textContent=views[role][1];const status=booking.querySelector('#vs-booking-status');status.textContent=confirmed?'Confirmed':'Pending';status.dataset.state=confirmed?'confirmed':'pending';accept.hidden=role!=='clinician'||confirmed;booking.querySelector('#vs-booking-feedback').textContent=confirmed?'The fictional request is confirmed. Switch to Patient or Administrator to see the same state.':'The fictional request is waiting for a clinician decision.';};for(const t of tabs){t.addEventListener('click',()=>{role=t.dataset.vsRole;render();});t.addEventListener('keydown',e=>{let n=tabs.indexOf(t);if(e.key==='ArrowRight')n=(n+1)%tabs.length;else if(e.key==='ArrowLeft')n=(n+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();role=tabs[n].dataset.vsRole;render();tabs[n].focus();});}accept.addEventListener('click',()=>{confirmed=true;render();booking.querySelector('[data-vs-reset-booking]').focus();});booking.querySelector('[data-vs-reset-booking]').addEventListener('click',()=>{confirmed=false;role='patient';render();});render();booking.hidden=false;}
})();
