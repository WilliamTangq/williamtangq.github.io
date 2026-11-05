/* Original interface studies. All names, records and states below are illustrative. */
(function (scope) {
  "use strict";
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
  const icons = {
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    people:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.9M15 3a4 4 0 0 1 0 8"/><circle cx="9" cy="7" r="4"/>',
    list:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-12 4h2m3 0h2"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    leaf:'<path d="M20 4C10 2 3 7 5 14c2 7 13 6 15-10ZM6 18l10-10"/>',
    database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    file:'<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8M8 16h5"/>',
    chart:'<path d="M4 3v17h17M8 16v-5m5 5V7m5 9V4"/>',
    sliders:'<path d="M4 7h16M4 17h16M8 4v6m8 4v6"/>',
    code:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20"/>'
  };
  const icon = name => '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (icons[name] || icons.grid) + '</svg>';
  const pill = (text,tone="neutral") => '<span class="iv-pill iv-pill-' + tone + '">' + escapeHTML(text) + '</span>';
  const heading = (title,sub,action="") => '<div class="iv-page-heading"><div><div class="iv-page-title">' + escapeHTML(title) + '</div><p>' + escapeHTML(sub) + '</p></div>' + (action ? '<span class="iv-demo-action">' + escapeHTML(action) + icon("arrow") + '</span>' : "") + '</div>';
  const panel = (title,body,kicker="") => '<section class="iv-panelcard">' + (kicker ? '<div class="iv-micro-label">' + escapeHTML(kicker) + '</div>' : "") + '<div class="iv-card-title">' + escapeHTML(title) + '</div>' + body + '</section>';
  const table = (headers,rows,extra="") => '<div class="iv-table-scroll ' + extra + '"><table class="iv-table"><thead><tr>' + headers.map(x=>'<th scope="col">' + escapeHTML(x) + '</th>').join("") + '</tr></thead><tbody>' + rows.map(row=>'<tr>' + row.map(cell=>'<td>' + cell + '</td>').join("") + '</tr>').join("") + '</tbody></table></div>';
  const detail = (label,value) => '<div class="iv-detail-row"><span>' + escapeHTML(label) + '</span><strong>' + escapeHTML(value) + '</strong></div>';
  const flow = items => '<ol class="iv-process">' + items.map(([title,description],i)=>'<li><span class="iv-process-number">' + String(i+1).padStart(2,"0") + '</span><strong>' + escapeHTML(title) + '</strong><p>' + escapeHTML(description) + '</p></li>').join("") + '</ol>';
  const note = (title,text) => '<div class="iv-context-note">' + icon("check") + '<div><strong>' + escapeHTML(title) + '</strong><span>' + escapeHTML(text) + '</span></div></div>';
  const catalog = {
    agencia:{
      brand:"Agencia",descriptor:"Change Engine",mark:"a.",theme:"blue",
      rail:[["grid","Workspace"],["list","Getting Started"],["people","Stakeholders"],["chart","Action plan"]],
      destination:"case-client-project.html",
      scenes:[
        {tab:"Workspace",view:"workspace",nav:0,title:"One workspace for a change plan",summary:"A concept for bringing responsibilities, activities and follow-up into view. Example records illustrate the shared planning context.",breadcrumb:"Change planning / Workspace"},
        {tab:"Onboarding",view:"onboarding",nav:1,title:"A clearer route into the platform",summary:"My focus: guided onboarding, consistent terminology, navigation and acceptance checks. This is a redesigned visual study, not a client screenshot.",breadcrumb:"Getting Started / Guided journey"},
        {tab:"Action plan",view:"actions",nav:3,title:"Make the next action visible",summary:"An illustrative action register showing ownership, status and follow-up. The example states are not measured project results.",breadcrumb:"Change planning / Action plan"}
      ]
    },
    tanshift:{
      brand:"TanShift",descriptor:"Workforce planning",mark:"ts",theme:"indigo",
      rail:[["grid","Overview"],["calendar","Schedules"],["people","Requests"],["sliders","Business rules"]],
      destination:"case-tanshift.html",
      scenes:[
        {tab:"Schedule",view:"schedule",nav:1,title:"A roster people can read at a glance",summary:"A manager scheduling study with day columns, readable shifts and a clear draft/publish boundary. All staff and assignments are sample content.",breadcrumb:"Manager / Weekly schedule"},
        {tab:"Requests",view:"requests",nav:2,title:"Give each request its context",summary:"Leave and swap requests are presented with the affected shift, review state and decision workflow. This illustrates the prototype’s request handling.",breadcrumb:"Manager / Request review"},
        {tab:"Business rules",view:"rules",nav:3,title:"Business rules underneath the calendar",summary:"A visual explanation of availability, week boundaries and publication state. The existing case study describes the prototype’s implementation limits.",breadcrumb:"Scheduling / Business rules"}
      ]
    },
    innerleaf:{
      brand:"InnerLeaf",descriptor:"A space to reflect",mark:"leaf",theme:"sage",
      rail:[["leaf","Reflect"],["list","Structured output"],["lock","Access & quality"],["sliders","Settings"]],
      destination:"case-innerleaf.html",
      scenes:[
        {tab:"Reflect",view:"reflection",nav:0,title:"Space to write, structure to continue",summary:"A calm reflection interface pairing fictional sample writing with organised facts and interpretations. No real journal content is used.",breadcrumb:"My space / Reflection"},
        {tab:"Structured output",view:"structure",nav:1,title:"A deliberate boundary around AI output",summary:"A representative data contract shows how a reflection can be parsed and normalised before reaching the interface. It is an illustration, not a captured API response.",breadcrumb:"Product / Structured output"},
        {tab:"Access & quality",view:"access",nav:2,title:"Clear boundaries for users and admins",summary:"A role map and expected routing scenarios make access behaviour easy to explain. These are acceptance scenarios, not a live test-results dashboard.",breadcrumb:"Product / Access boundaries"}
      ]
    },
    database:{
      brand:"Data Model",descriptor:"Relational design studio",mark:"db",theme:"violet",
      rail:[["database","Entity model"],["code","SQL workspace"],["check","Integrity review"],["file","Business rules"]],
      destination:"case-database.html",
      scenes:[
        {tab:"Entity model",view:"erd",nav:0,title:"Relationships before queries",summary:"An original, representative commerce schema with explicit primary keys, foreign keys and one-to-many relationships. Assessed university material is not reproduced.",breadcrumb:"Design / Entity relationships"},
        {tab:"SQL workspace",view:"query",nav:1,title:"A business question becomes a query",summary:"A readable SQL example connects customers with order counts using a LEFT JOIN. Result rows are labelled sample output.",breadcrumb:"Query / Customer order summary"},
        {tab:"Integrity review",view:"integrity",nav:2,title:"Make the rules inspectable",summary:"A visual review of identifiers, reference constraints and normalisation. It explains design intent rather than claiming measured test coverage.",breadcrumb:"Design / Integrity review"}
      ]
    },
    cstan:{
      brand:"CS TAN",descriptor:"Commercial operations",mark:"cs",theme:"sand",
      rail:[["grid","Operations"],["file","Documents"],["chart","Stock analysis"],["people","Customer records"]],
      destination:"case-cstan.html",
      scenes:[
        {tab:"Operations",view:"operations",nav:0,title:"The small details behind a working business",summary:"A concept board for enquiries, quotations and order coordination, based on my commercial responsibilities. Every record is fictional.",breadcrumb:"Business / Operations board"},
        {tab:"Documents",view:"documents",nav:1,title:"Consistent documents, clearer handovers",summary:"A document study shows enquiry references, line items and approval context. It contains no customer, supplier or financial records.",breadcrumb:"Business / Document workflow"},
        {tab:"Stock analysis",view:"stock",nav:2,title:"Turn stock records into a useful decision",summary:"An illustrative stock worksheet connects sample quantities with purchasing follow-up. The figures are demo data, not business performance claims.",breadcrumb:"Business / Stock review"}
      ]
    }
  };

  function agencia(view) {
    if(view==="onboarding") return heading("A confident first step.","A guided introduction to the change-planning workspace.") +
      '<div class="iv-onboarding-hero"><div class="iv-welcome-mark">' + icon("grid") + '</div><div class="iv-micro-label">Getting Started</div><div class="iv-welcome-title">Your plan starts here.</div><p>Understand the workspace, explore the guidance and find your next step.</p>' + flow([["Discover","Find the right entry point."],["Explore","Follow guidance through the platform."],["Continue","Return to your change-planning tasks."]]) + '</div>' +
      '<div class="iv-check-strip"><span>' + icon("check") + 'Clear entry points</span><span>' + icon("check") + 'Consistent labels</span><span>' + icon("check") + 'Acceptance checks</span></div>';
    if(view==="actions") return heading("The next step, made visible.","Example action register · operational signals, not outcome measures","Review actions") +
      table(["Activity","Owner","State","Next step"],[
        ["Confirm impacted groups","Change lead",pill("Review","amber"),"Check group definitions"],
        ["Review readiness activities","Project team",pill("In progress","blue"),"Confirm responsibilities"],
        ["Coordinate training","Training lead",pill("Planned","neutral"),"Review activity details"]
      ]) + '<div class="iv-two-columns">' + panel("Accountability",detail("Each action","Named owner")+detail("Each review","Clear next step"),"Design focus") + panel("Keeping plans useful",'<p class="iv-body-copy">Make status and follow-up easy to find, so teams can continue the work with shared context.</p>',"Coordination") + '</div>';
    return heading("A shared view of the change plan.","Example workspace · activities, people and responsibilities","Open plan") +
      '<div class="iv-summary-grid"><div><span>Plan</span><strong>Launch preparation</strong><small>Illustrative change initiative</small></div><div><span>Coordination</span><strong>Shared ownership</strong><small>Activities + responsibilities</small></div><div><span>Focus</span><strong>Clear next actions</strong><small>Review + follow-up</small></div></div>' +
      panel("Plan activities",table(["Activity","Area","State"],[
        ['<span class="iv-row-main">Identify impacted groups</span>',"Stakeholders",pill("Review","amber")],
        ['<span class="iv-row-main">Plan readiness activities</span>',"Readiness",pill("In progress","blue")],
        ['<span class="iv-row-main">Coordinate training</span>',"Training",pill("Planned","neutral")]
      ])) + note("My contribution","Guided onboarding, front-end refinement and acceptance checks.");
  }

  function tanshift(view) {
    if(view==="requests") return heading("Review with the shift in view.","Fictional request records · manager perspective", "Request queue") +
      '<div class="iv-two-columns"><section class="iv-request-card"><div class="iv-request-top">' + pill("Leave request","indigo") + pill("Pending","amber") + '</div><strong>Team member A</strong><p>Friday · Morning shift</p><div class="iv-request-detail"><span>Requested change</span><b>Time away from scheduled shift</b></div><div class="iv-decision-row"><span>Approve</span><span>Decline</span></div></section><section class="iv-request-card"><div class="iv-request-top">' + pill("Shift swap","indigo") + pill("Pending","amber") + '</div><strong>Team member B</strong><p>Wednesday · Afternoon shift</p><div class="iv-request-detail"><span>Requested change</span><b>Swap an existing assignment</b></div><div class="iv-decision-row"><span>Approve</span><span>Decline</span></div></section></div>' +
      flow([["Submit","Staff request a leave or swap."],["Review","Manager checks the shift context."],["Decide","Record approval or rejection."]]);
    if(view==="rules") return heading("A calendar with business logic.","Representative rules from the prototype’s scheduling workflow.") +
      '<div class="iv-rule-list">' + [["calendar","Within the selected week","A shift date belongs to the schedule week."],["people","Availability respected","Check submitted availability before assigning a shift."],["lock","Publication is explicit","Keep draft work separate from published schedules."]].map(([i,t,d],n)=>'<div class="iv-rule-row"><span class="iv-rule-icon">' + icon(i) + '</span><div><strong>' + t + '</strong><p>' + d + '</p></div><span class="iv-rule-index">0' + (n+1) + '</span></div>').join("") + '</div>' +
      note("From draft to published","Prepare the roster → review constraints → publish the schedule.");
    const shifts=[["Team member A",["09:00–17:00","09:00–17:00","","13:00–21:00","13:00–21:00"]],["Team member B",["11:00–19:00","","09:00–17:00","09:00–17:00",""]],["Team member C",["","13:00–21:00","13:00–21:00","","11:00–19:00"]],["Team member D",["09:00–17:00","","11:00–19:00","","13:00–21:00"]]];
    return heading("The week, brought together.","Example week · sample assignments", "Draft schedule") +
      '<div class="iv-roster-toolbar"><span class="iv-week-selector">' + icon("calendar") + 'Monday — Friday</span><div class="iv-roster-key"><span><i></i>Morning</span><span><i></i>Afternoon</span></div></div>' +
      '<div class="iv-table-scroll"><table class="iv-roster"><thead><tr><th scope="col">Team member</th>' + ["Mon","Tue","Wed","Thu","Fri"].map(d=>'<th scope="col">' + d + '</th>').join("") + '</tr></thead><tbody>' + shifts.map(([name,days],i)=>'<tr><th scope="row"><span class="iv-avatar">' + String.fromCharCode(65+i) + '</span>' + name + '</th>' + days.map(shift=>'<td>' + (shift ? '<span class="iv-shift ' + (shift.startsWith("13")?"iv-shift-pm":shift.startsWith("11")?"iv-shift-mid":"") + '"><b>' + (shift.startsWith("13")?"Afternoon":shift.startsWith("11")?"Midday":"Morning") + '</b><small>' + shift + '</small></span>':'<span class="iv-off">—</span>') + '</td>').join("") + '</tr>').join("") + '</tbody></table></div>' +
      '<div class="iv-roster-bottom"><span>Illustrative roster · no real staff records</span>' + pill("Draft → Review → Published","indigo") + '</div>';
  }

  function innerleaf(view) {
    if(view==="structure") return heading("Structure before presentation.","Representative output contract · fictional sample reflection.") +
      '<div class="iv-two-columns iv-code-layout"><section class="iv-code-card"><div class="iv-code-title">' + icon("code") + 'reflection.sample.json</div><pre><code>{\n  <span class="iv-code-key">"facts"</span>: [\n    <span class="iv-code-string">"I shared an idea in a meeting."</span>\n  ],\n  <span class="iv-code-key">"interpretation"</span>:\n    <span class="iv-code-string">"I assumed the idea was unclear."</span>,\n  <span class="iv-code-key">"next_step"</span>:\n    <span class="iv-code-string">"Ask for specific feedback."</span>\n}</code></pre></section><div class="iv-output-contract">' + panel("Parse",'<p class="iv-body-copy">Turn the model response into structured fields.</p>',"01 / Boundary") + panel("Normalise",'<p class="iv-body-copy">Handle missing or inconsistent fields before rendering.</p>',"02 / Validation") + panel("Present",'<p class="iv-body-copy">Show a readable reflection with a practical next step.</p>',"03 / Experience") + '</div></div>';
    if(view==="access") return heading("The right experience for each role.","Expected routes and access boundaries · acceptance scenarios.") +
      '<div class="iv-two-columns"><section class="iv-role-card">' + icon("leaf") + '<strong>User space</strong><p>Reflection · History · Profile</p>' + pill("Personal experience","green") + '</section><section class="iv-role-card">' + icon("lock") + '<strong>Admin space</strong><p>Users · Feedback · System views</p>' + pill("Role-aware access","green") + '</section></div>' +
      table(["Scenario","Expected behaviour"],[["Signed-in user","Continue to user experience"],["Signed-in admin","Continue to admin experience"],["User opens admin route","Block access to admin area"],["Logged-out visitor","Redirect to sign in"]]);
    return heading("Take a moment to reflect.","Fictional sample writing · an interface study.") +
      '<div class="iv-reflection-layout"><section class="iv-journal"><div class="iv-micro-label">Your reflection</div><div class="iv-journal-title">What’s on your mind?</div><p>I shared an idea in a meeting today. The conversation moved on quickly, and I kept wondering whether I had explained it clearly.</p><div class="iv-journal-footer"><span>Example writing</span><span class="iv-reflect-action">Reflect ' + icon("arrow") + '</span></div></section><section class="iv-reflection-result"><div class="iv-micro-label">A little perspective</div><div class="iv-reflection-block"><span>01 / Facts</span><p>You shared an idea and the conversation continued.</p></div><div class="iv-reflection-block"><span>02 / Interpretation</span><p>You wondered whether the idea was clear.</p></div><div class="iv-reflection-block iv-next-step"><span>03 / Next step</span><p>Ask a colleague for specific feedback.</p></div></section></div>';
  }

  function entity(x,y,name,fields) {
    return '<g transform="translate(' + x + ' ' + y + ')"><rect width="210" height="135" rx="10"/><path d="M0 35h210"/><text x="15" y="23" class="iv-entity-title">' + name + '</text>' + fields.map((f,i)=>'<text x="15" y="' + (59+i*22) + '" class="' + (f.startsWith("PK")||f.startsWith("FK")?"iv-key-field":"") + '">' + f + '</text>').join("") + '</g>';
  }
  function database(view) {
    if(view==="query") return heading("Which customers have placed orders?","Oracle-compatible SQL example · customer order summary.") +
      '<section class="iv-code-card"><div class="iv-code-title">' + icon("code") + 'customer_order_summary.sql</div><pre><code><span class="iv-code-key">SELECT</span> c.customer_id, c.name,\n       <span class="iv-code-key">COUNT</span>(o.order_id) <span class="iv-code-key">AS</span> order_count\n<span class="iv-code-key">FROM</span> customer c\n<span class="iv-code-key">LEFT JOIN</span> orders o\n  <span class="iv-code-key">ON</span> o.customer_id = c.customer_id\n<span class="iv-code-key">GROUP BY</span> c.customer_id, c.name;</code></pre></section>' +
      '<div class="iv-result-heading"><strong>Sample output</strong><span>Fictional records · not live data</span></div>' +
      table(["CUSTOMER_ID","NAME","ORDER_COUNT"],[["101","Example customer A","2"],["102","Example customer B","0"]]);
    if(view==="integrity") return heading("Consistency is part of the design.","Review the model against its business rules.") +
      table(["Design concern","Representative rule","Purpose"],[
        ["Primary keys","Unique identifier for each entity","Identify records consistently"],
        ["Foreign keys","orders.customer_id → customer","Preserve valid references"],
        ["Order items","Each item references an order and product","Separate repeating line items"],
        ["Normalisation","Store product details with the product","Reduce duplicated attributes"]
      ]) + note("Business rules → model → SQL","Explain the relationship first, then implement and inspect the constraint.");
    return heading("A model with explicit relationships.","Representative commerce schema · not an assessed university ERD.") +
      '<div class="iv-erd-scroll"><svg class="iv-erd-canvas" viewBox="0 0 740 345" aria-hidden="true" focusable="false"><path class="iv-relationship" d="M230 88H490M595 155V190M490 258H230"/><text x="246" y="76" class="iv-cardinality">1</text><text x="469" y="76" class="iv-cardinality">N</text><text x="606" y="174" class="iv-cardinality">1 : N</text><text x="247" y="246" class="iv-cardinality">1</text><text x="469" y="246" class="iv-cardinality">N</text>' +
      entity(20,20,"CUSTOMER",["PK customer_id","name","email"]) +
      entity(490,20,"ORDERS",["PK order_id","FK customer_id","order_date"]) +
      entity(490,190,"ORDER_ITEM",["PK order_item_id","FK order_id","FK product_id","quantity"]) +
      entity(20,190,"PRODUCT",["PK product_id","product_name","unit_price"]) +
      '</svg></div><div class="iv-model-legend"><span><b>PK</b>Primary key</span><span><b>FK</b>Foreign key</span><span><b>1 : N</b>One-to-many</span></div>';
  }

  function cstan(view) {
    if(view==="documents") return heading("A clear record of the request.","Representative document workflow · no real customer or pricing data.") +
      '<div class="iv-document-layout"><section class="iv-quote-sheet"><div class="iv-quote-brand"><b>CS TAN</b><span>QUOTATION STUDY</span></div><div class="iv-quote-meta"><div><span>Prepared for</span><strong>Example business customer</strong></div><div><span>Reference</span><strong>DEMO-001</strong></div></div>' +
      table(["Description","Qty","Follow-up"],[["Requested product A","2","Confirm specification"],["Requested product B","1","Confirm availability"]]) +
      '<div class="iv-document-total"><span>Commercial amounts</span><strong>Not included in this illustration</strong></div><div class="iv-document-signoff">Enquiry reference · Supplier confirmation · Customer follow-up</div></section><div class="iv-document-checks">' + panel("Before issuing",'<ul class="iv-tick-list"><li>' + icon("check") + 'Match the enquiry</li><li>' + icon("check") + 'Confirm supplier details</li><li>' + icon("check") + 'Review line items</li><li>' + icon("check") + 'Keep a clear record</li></ul>') + note("Consistency matters","Repeatable templates support recurring customer-facing work.") + '</div></div>';
    if(view==="stock") {
      const rows=[["Product A",12,5,"Review purchase"],["Product B",28,15,"Monitor movement"],["Product C",17,8,"Check demand"]];
      return heading("A worksheet with a next step.","Sample quantities for illustration · not CS TAN business records.") +
        table(["Product","Opening stock","Units sold","Remaining","Follow-up"],rows.map(([name,opening,sold,next])=>[name,String(opening),String(sold),String(opening-sold),pill(next,next==="Review purchase"?"amber":"neutral")])) +
        '<div class="iv-two-columns">' + panel("Read the movement",'<p class="iv-body-copy">Compare stock and sales records before deciding what needs attention.</p>',"Analysis") + panel("Ask the business question",'<p class="iv-body-copy">Does purchasing need to change, or does the demand pattern need a closer look?</p>',"Decision support") + '</div>' +
        note("Working tool: Excel","The illustration explains the analysis workflow, not a proprietary internal dashboard.");
    }
    const columns=[
      ["Enquiries","01",[["Example request A","Confirm the product specification","Customer context"]]],
      ["Quotations","02",[["Example request B","Check supplier availability","Supplier follow-up"]]],
      ["Order coordination","03",[["Example request C","Prepare the document trail","Records + handover"]]]
    ];
    return heading("Keep the work moving.","Illustrative operations board · fictional request records.") +
      '<div class="iv-kanban">' + columns.map(([name,index,items])=>'<section class="iv-board-column"><div class="iv-board-title"><strong>' + name + '</strong><span>' + index + '</span></div>' + items.map(([t,d,s])=>'<div class="iv-board-record"><span class="iv-record-id">DEMO / ' + index + '</span><strong>' + t + '</strong><p>' + d + '</p><div>' + icon("file") + s + '</div></div>').join("") + '</section>').join("") + '</div>' +
      '<div class="iv-operations-strip"><span>' + icon("people") + 'Customer communication</span><span>' + icon("file") + 'Consistent documentation</span><span>' + icon("chart") + 'Operational context</span></div>';
  }
  const renderers={agencia,tanshift,innerleaf,database,cstan};
  const normalizeIndex=(index,length)=>((Number.isFinite(index)?Math.trunc(index):0)%length+length)%length;
  function renderScene(key,index=0,options={}) {
    const project=catalog[key];
    if(!project)return "";
    const scene=project.scenes[normalizeIndex(index,project.scenes.length)];
    const body=renderers[key](scene.view);
    return '<div class="iv-screen iv-theme-' + project.theme + (options.cover?" iv-screen-cover":"") + '" role="img" aria-label="' + escapeHTML(project.brand + ": " + scene.title + ". Original interface study with illustrative content.") + '"><div class="iv-browser"><span class="iv-browser-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="iv-browser-path">' + escapeHTML(project.brand + " / Interface study") + '</span><span class="iv-browser-study">Concept</span></div><div class="iv-app"><aside class="iv-sidebar"><div class="iv-app-brand"><span class="iv-brand-symbol">' + (project.mark==="leaf"?icon("leaf"):escapeHTML(project.mark)) + '</span><div><strong>' + escapeHTML(project.brand) + '</strong><span>' + escapeHTML(project.descriptor) + '</span></div></div><div class="iv-nav-label">Workspace</div><div class="iv-app-nav">' + project.rail.map(([symbol,label],i)=>'<div class="iv-nav-item' + (i===scene.nav?" is-current":"") + '">' + icon(symbol) + '<span>' + escapeHTML(label) + '</span></div>').join("") + '</div><div class="iv-sidebar-footer">' + icon("file") + '<span>Portfolio study<br><small>Illustrative content</small></span></div></aside><div class="iv-main"><div class="iv-app-topbar"><span>' + escapeHTML(scene.breadcrumb) + '</span><span class="iv-study-tag">Example workspace</span></div><div class="iv-workspace">' + body + '</div></div></div></div>';
  }
  const api={catalog,renderScene,normalizeIndex,escapeHTML};
  if(typeof module!=="undefined" && module.exports)module.exports=api;
  scope.PortfolioVisuals=api;
})(typeof globalThis!=="undefined"?globalThis:this);
