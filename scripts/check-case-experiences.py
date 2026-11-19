"""Execute the query lab's rendering code and compare its results with SQLite."""
from pathlib import Path
import subprocess,json,sqlite3
p=Path(__file__).resolve().parents[1]
node=r'''
const fs=require('node:fs'),vm=require('node:vm');
function el(){return {children:[],listeners:{},textContent:'',value:'',dataset:{},appendChild(x){this.children.push(x);},append(...xs){this.children.push(...xs);},replaceChildren(...xs){this.children=xs;},addEventListener(k,f){this.listeners[k]=f;}};}
const nodes=new Map();const root=el();root.dataset.cx='database';root.querySelector=s=>{if(!nodes.has(s))nodes.set(s,el());return nodes.get(s);};root.querySelectorAll=()=>[];root.querySelector('[data-cx-query]').value='totals';
const document={readyState:'complete',querySelectorAll:()=>[root],createElement:el};
vm.runInNewContext(fs.readFileSync('assets/case-experiences.js','utf8'),{document});
const results=[];
for(const key of ['totals','open','lines','integrity']){const select=root.querySelector('[data-cx-query]');select.value=key;select.listeners.change();const cleared=root.querySelector('[data-cx-sql-output]').children.length===0;root.querySelector('[data-cx-run]').listeners.click();const table=root.querySelector('[data-cx-sql-output]').children[0];results.push({key,cleared,sql:root.querySelector('[data-cx-code]').textContent,rows:table.children[1].children.map(tr=>tr.children.map(td=>td.textContent)),count:root.querySelector('[data-cx-result-count]').textContent});}
console.log(JSON.stringify(results));
'''
r=json.loads(subprocess.check_output(['node','-e',node],cwd=p))
def norm(x):
 s=str(x).replace('$','')
 try:return float(s)
 except ValueError:return s
for result in r:
 assert result['cleared'],result['key']
 db=sqlite3.connect(':memory:');db.executescript((p/'data/query-lab.sql').read_text())
 if result['key']=='integrity':
  try:db.executescript(result['sql'])
  except sqlite3.IntegrityError:pass
  else:raise AssertionError('Orphan order was accepted')
  assert result['count']=='0 rows inserted'
 else:
  expected=[[norm(v) for v in row] for row in db.execute(result['sql']).fetchall()]
  actual=[[norm(v) for v in row] for row in result['rows']]
  assert actual==expected,(result['key'],actual,expected)
print(json.dumps({'queriesMatchedSQLite':3,'foreignKeyViolationRejected':True,'staleResultsCleared':4}))
