/* Interactive case showcases. Every record here is fictional; no app backend is contacted. */
(function(){
"use strict";
function find(root,selector){return root.querySelector(selector);}
function all(root,selector){return Array.from(root.querySelectorAll(selector));}
function feedback(root,message){const el=find(root,"[data-cx-feedback]");if(el)el.textContent=message;}
function setText(root,selector,value){const el=find(root,selector);if(el)el.textContent=String(value);}
function setPressed(buttons,selected,getValue){buttons.forEach(function(button){button.setAttribute("aria-pressed",String(getValue(button)===selected));});}
function initRespira(root){
 var step=0;
 var steps=all(root,"[data-cx-step]");
 var panels=all(root,"[data-cx-panel]");
 var explanations=[
  "A patient enters a fictional daily log. The documentation describes measurements and history views; no clinical interpretation is made here.",
  "The clinician-facing journey summarises the sample log and focuses on the right information reaching the right role.",
  "The booking workflow connects a patient request, clinician decision and operational record. Use the separate role simulator further down this page."
 ];
 function render(){
  setPressed(steps,String(step),function(b){return b.dataset.cxStep;});
  panels.forEach(function(panel){panel.hidden=Number(panel.dataset.cxPanel)!==step;});
  setText(root,"[data-cx-step-caption]",explanations[step]);
  setText(root,"[data-cx-step-number]",String(step+1)+" / 3");
 }
 steps.forEach(function(button){button.addEventListener("click",function(){step=Number(button.dataset.cxStep);render();});});
 render();
}
function initTanShift(root){
 var staff=["Maya","Noah","Ava"],days=["Mon","Tue","Wed","Thu","Fri"];
 var shifts={"Morning":"09:00–17:00","Evening":"13:00–21:00"};
 var availability={
  Maya:{Mon:["Morning"],Tue:["Morning"],Wed:[],Thu:["Evening"],Fri:["Morning"]},
  Noah:{Mon:["Evening"],Tue:[],Wed:["Morning"],Thu:["Morning"],Fri:["Evening"]},
  Ava:{Mon:[],Tue:["Evening"],Wed:["Evening"],Thu:["Morning"],Fri:[]}
 };
 var initial=[{staff:"Maya",day:"Mon",shift:"Morning"},{staff:"Noah",day:"Mon",shift:"Evening"},{staff:"Maya",day:"Tue",shift:"Morning"},{staff:"Ava",day:"Tue",shift:"Evening"},{staff:"Noah",day:"Wed",shift:"Morning"}];
 var roster=initial.map(function(e){return Object.assign({},e);}),published=false;
 var grid=find(root,"[data-cx-roster-grid]"),staffList=find(root,"[data-cx-staff-list]");
 var staffInput=find(root,"[data-cx-staff]"),dayInput=find(root,"[data-cx-day]"),shiftInput=find(root,"[data-cx-shift]");
 function render(){
  grid.replaceChildren();
  days.forEach(function(day){
   var column=document.createElement("div");column.className="cx-day";
   var title=document.createElement("strong");title.textContent=day;column.appendChild(title);
   var assigned=roster.filter(function(item){return item.day===day;});
   assigned.forEach(function(item){var card=document.createElement("div");card.className="cx-shift";var name=document.createElement("b");name.textContent=item.staff;var when=document.createElement("small");when.textContent=item.shift+" · "+shifts[item.shift];card.append(name,when);column.appendChild(card);});
   if(!assigned.length){var empty=document.createElement("span");empty.className="cx-empty";empty.textContent="No assignment";column.appendChild(empty);}
   grid.appendChild(column);
  });
  setText(root,"[data-cx-roster-state]",published?"Published":"Draft");
  setText(root,"[data-cx-count]",String(roster.length));
  var publish=find(root,"[data-cx-publish]");publish.disabled=published;publish.textContent=published?"Published ✓":"Publish roster";
  find(root,"[data-cx-add]").disabled=published;
  [staffInput,dayInput,shiftInput].forEach(function(el){el.disabled=published;});
  var selected=find(root,"[data-cx-view-staff]").value;
  staffList.replaceChildren();
  if(!published){
   var note=document.createElement("p");note.className="cx-muted";note.textContent="Draft is manager-only. No shifts appear in the staff view until publishing.";staffList.appendChild(note);
  }else{
   var filtered=roster.filter(function(item){return item.staff===selected;});
   if(!filtered.length){var empty=document.createElement("p");empty.className="cx-muted";empty.textContent="No published shifts for "+selected+".";staffList.appendChild(empty);}
   filtered.forEach(function(item){var card=document.createElement("div");card.className="cx-callout";card.style.margin="8px 0";var label=document.createElement("strong");label.textContent=item.day+" · "+item.shift;var date=document.createElement("div");date.className="cx-muted";date.style.fontSize="12px";date.textContent=shifts[item.shift];card.append(label,date);staffList.appendChild(card);});
  }
 }
 find(root,"[data-cx-add]").addEventListener("click",function(){
  if(published){feedback(root,"Published schedule is locked. Reset the demo to edit again.");return;}
  var name=staffInput.value,day=dayInput.value,shift=shiftInput.value;
  if(!staff.includes(name)||!days.includes(day)||!Object.hasOwn(shifts,shift)){feedback(root,"Please choose a valid staff member, day and shift.");return;}
  if(!availability[name][day].includes(shift)){feedback(root,"Blocked: "+name+" has not submitted availability for "+day+" "+shift.toLowerCase()+".");return;}
  if(roster.some(function(item){return item.staff===name&&item.day===day;})){feedback(root,"Blocked: "+name+" already has an assignment on "+day+".");return;}
  roster.push({staff:name,day:day,shift:shift});
  render();feedback(root,"Shift added to draft. Staff cannot view it until publishing.");
 });
 find(root,"[data-cx-publish]").addEventListener("click",function(){
  if(published)return;
  published=true;render();feedback(root,"Roster published. Select a team member to inspect their visible shifts.");
 });
 find(root,"[data-cx-reset]").addEventListener("click",function(){
  roster=initial.map(function(item){return Object.assign({},item);});published=false;render();feedback(root,"Demo reset to the sample draft schedule.");
 });
 find(root,"[data-cx-view-staff]").addEventListener("change",render);
 render();
}
function initInnerLeaf(root){
 var scenes={
  meeting:{story:"I shared an idea at a team meeting. The conversation moved on before anyone commented.",fact:"The team moved to the next agenda item after I shared an idea.",interpretation:["I do not yet know what colleagues thought.","Everyone must have thought my idea was weak."],need:["Clarity and specific feedback.","Reassurance about how others perceived me."],next:["Ask a colleague which part of the idea would be most useful to develop.","Pause, separate the event from the assumption, then seek concrete feedback."],pattern:["Uncertainty","Mind-reading assumption"]},
  study:{story:"I prepared for an assessment, but I felt anxious after one difficult practice question.",fact:"One practice question was difficult and took longer than planned.",interpretation:["One question does not establish the whole result.","I am going to fail because this question was hard."],need:["A clearer view of my preparation.","A manageable revision plan."],next:["Review the missed concept and try two fresh examples.","Identify the gap and plan one focused revision block."],pattern:["Evidence gathering","Catastrophising assumption"]},
  change:{story:"A project requirement changed just before a planned review.",fact:"The requirement was revised before the review.",interpretation:["The impact still needs to be clarified.","This means our whole project is going wrong."],need:["Shared understanding of the change.","Confidence in the plan and priorities."],next:["Confirm the new acceptance criteria and update the change log.","List the actual impacts before revising the delivery plan."],pattern:["Clarification","All-or-nothing assumption"]}
 };
 var scenario="meeting",path=0;
 var scenarios=all(root,"[data-cx-scenario]"),branches=all(root,"[data-cx-branch]");
 function render(){
  var s=scenes[scenario];
  setPressed(scenarios,scenario,function(b){return b.dataset.cxScenario;});
  setPressed(branches,String(path),function(b){return b.dataset.cxBranch;});
  setText(root,"[data-cx-story]",s.story);
  setText(root,"[data-cx-fact]",s.fact);
  setText(root,"[data-cx-interpretation]",s.interpretation[path]);
  setText(root,"[data-cx-need]",s.need[path]);
  setText(root,"[data-cx-next]",s.next[path]);
  setText(root,"[data-cx-pattern]",s.pattern[path]);
  setText(root,"[data-cx-path-state]",path===0?"Curious / evidence-led":"Assumption / needs checking");
  feedback(root,"Fictional structured example. This uses preset scenarios, not a live AI model or real personal data.");
 }
 scenarios.forEach(function(b){b.addEventListener("click",function(){scenario=b.dataset.cxScenario;path=0;render();});});
 branches.forEach(function(b){b.addEventListener("click",function(){path=Number(b.dataset.cxBranch);render();});});
 render();
}
function initGovernance(root){
 var version=1,reviewed=0,approved=0;
 var report=find(root,"[data-cx-report]"),trace=find(root,"[data-cx-trace]");
 var log=find(root,"[data-cx-audit]");
 function audit(message){
  var item=document.createElement("li");
  item.textContent="v"+version+" · "+message;
  log.prepend(item);
  while(log.children.length>5)log.lastElementChild.remove();
 }
 function ready(){return report.checked&&trace.checked;}
 function render(){
  var reviewReady=ready();
  var reviewCurrent=reviewed===version&&reviewReady;
  var approvalCurrent=approved===version&&reviewCurrent;
  find(root,"[data-cx-review]").disabled=!reviewReady||reviewCurrent;
  find(root,"[data-cx-approve]").disabled=!reviewCurrent||approvalCurrent;
  setText(root,"[data-cx-evidence-version]","v"+version);
  setText(root,"[data-cx-review-state]",reviewCurrent?"Current":"Pending");
  setText(root,"[data-cx-approval-state]",approvalCurrent?"Approved":"Not approved");
  setText(root,"[data-cx-decision]",approvalCurrent?"Approved in portfolio simulation":reviewCurrent?"Ready for a separate approval decision":reviewReady?"Awaiting independent review":"Evidence incomplete — approval blocked");
  all(root,"[data-cx-gate]").forEach(function(el){
   var gate=el.dataset.cxGate;
   el.dataset.done=String(gate==="evidence"?reviewReady:gate==="review"?reviewCurrent:approvalCurrent);
  });
 }
 function invalidate(reason){reviewed=0;approved=0;audit(reason);render();}
 report.addEventListener("change",function(){invalidate(report.checked?"Test record added":"Test record removed — review invalidated");feedback(root,"A material evidence change requires independent re-review.");});
 trace.addEventListener("change",function(){invalidate(trace.checked?"Configuration trace added":"Configuration trace removed — review invalidated");feedback(root,"The evidence package changed. Existing review and approval are no longer current.");});
 find(root,"[data-cx-review]").addEventListener("click",function(){
  if(!ready())return;reviewed=version;approved=0;audit("Independent evidence review recorded (fictional)");render();feedback(root,"Review recorded for the current evidence version. Approval is now available.");
 });
 find(root,"[data-cx-approve]").addEventListener("click",function(){
  if(reviewed!==version||!ready())return;approved=version;audit("Approval decision recorded (fictional)");render();feedback(root,"Sample approval recorded. Change the evidence version to test re-approval controls.");
 });
 find(root,"[data-cx-revise]").addEventListener("click",function(){
  version+=1;reviewed=0;approved=0;audit("Evidence revised — prior review and approval invalidated");render();feedback(root,"Version changed to v"+version+". A new independent review is mandatory before approval.");
 });
 audit("Simulation opened — report present, configuration trace outstanding");render();
}
function initDatabase(root){
 var customers=[{id:1,name:"Acme Studio"},{id:2,name:"Beacon Retail"},{id:3,name:"Cove Supply"}];
 var products=[{id:11,name:"Laptop stand",price:40},{id:12,name:"Desk mat",price:25},{id:13,name:"Cable organiser",price:15}];
 var orders=[{id:101,customer:1,status:"open",date:"2026-03-10"},{id:102,customer:2,status:"fulfilled",date:"2026-03-11"},{id:103,customer:1,status:"fulfilled",date:"2026-03-12"},{id:104,customer:3,status:"open",date:"2026-03-13"}];
 var items=[{order:101,product:11,quantity:2},{order:101,product:13,quantity:1},{order:102,product:12,quantity:4},{order:103,product:11,quantity:1},{order:103,product:12,quantity:2},{order:104,product:13,quantity:3}];
 var sql={
  totals:"SELECT c.name, SUM(oi.quantity * p.price) AS spend\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN order_items oi ON oi.order_id = o.id\nJOIN products p ON p.id = oi.product_id\nGROUP BY c.id, c.name\nORDER BY spend DESC;",
  open:"SELECT o.id, c.name, o.order_date\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'open'\nORDER BY o.order_date;",
  lines:"SELECT p.name, oi.quantity, p.price,\n       oi.quantity * p.price AS line_total\nFROM order_items oi\nJOIN products p ON p.id = oi.product_id\nWHERE oi.order_id = 101;",
  integrity:"INSERT INTO order_items (order_id, product_id, quantity)\nVALUES (999, 11, 1);\n-- Rejected: order 999 does not exist."
 };
 function customer(id){return customers.find(function(c){return c.id===id;}).name;}
 function product(id){return products.find(function(p){return p.id===id;});}
 function money(value){return "$"+value.toFixed(2);}
 function table(columns,rows){
  var outer=find(root,"[data-cx-sql-output]");outer.replaceChildren();
  var table=document.createElement("table");table.className="cx-sql-table";var thead=document.createElement("thead"),header=document.createElement("tr");
  columns.forEach(function(column){var th=document.createElement("th");th.scope="col";th.textContent=column;header.appendChild(th);});
  thead.appendChild(header);table.appendChild(thead);var body=document.createElement("tbody");
  rows.forEach(function(row){var tr=document.createElement("tr");row.forEach(function(value){var td=document.createElement("td");td.textContent=String(value);tr.appendChild(td);});body.appendChild(tr);});
  table.appendChild(body);outer.appendChild(table);
 }
 var selector=find(root,"[data-cx-query]");
 function run(){
  var key=selector.value;
  setText(root,"[data-cx-code]",sql[key]);
  if(key==="totals"){
   var rows=customers.map(function(c){
    var ids=orders.filter(function(o){return o.customer===c.id;}).map(function(o){return o.id;});
    return [c.name,money(items.filter(function(i){return ids.includes(i.order);}).reduce(function(sum,i){return sum+i.quantity*product(i.product).price;},0))];
   }).sort(function(a,b){return Number(b[1].slice(1))-Number(a[1].slice(1));});
   table(["customer","spend"],rows);setText(root,"[data-cx-result-count]",rows.length+" rows");
   feedback(root,"Customer totals aggregate order-item quantities against product prices. Sample records only.");
  }else if(key==="open"){
   var rows=orders.filter(function(o){return o.status==="open";}).sort(function(a,b){return a.date.localeCompare(b.date);}).map(function(o){return [o.id,customer(o.customer),o.date];});
   table(["order_id","customer","order_date"],rows);setText(root,"[data-cx-result-count]",rows.length+" rows");
   feedback(root,"Filter example: only open sample orders are returned.");
  }else if(key==="lines"){
   var rows=items.filter(function(i){return i.order===101;}).map(function(i){return [product(i.product).name,i.quantity,money(product(i.product).price),money(i.quantity*product(i.product).price)];});
   table(["product","qty","unit_price","line_total"],rows);setText(root,"[data-cx-result-count]",rows.length+" rows");
   feedback(root,"The order-item join keeps line quantities separate from product attributes.");
  }else{
   table(["result","reason"],[["Rejected","FOREIGN KEY constraint failed: order 999 is absent"]]);
   setText(root,"[data-cx-result-count]","0 rows inserted");
   feedback(root,"Illustrative integrity check: a child row cannot reference a missing parent order. No database write occurred.");
  }
 }
 selector.addEventListener("change",function(){setText(root,"[data-cx-code]",sql[selector.value]);});
 find(root,"[data-cx-run]").addEventListener("click",run);
 find(root,"[data-cx-reset-sql]").addEventListener("click",function(){selector.value="totals";run();});
 run();
}
function mount(){
 var handlers={respira:initRespira,tanshift:initTanShift,innerleaf:initInnerLeaf,governance:initGovernance,database:initDatabase};
 document.querySelectorAll(".cx-experience[data-cx]").forEach(function(root){
  var handler=handlers[root.dataset.cx];if(handler)handler(root);
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
})();