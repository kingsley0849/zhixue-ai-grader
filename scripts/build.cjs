const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
function build(version=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8').replace(/^\uFEFF/,'')).version){
 if(!/^\d+(?:\.\d+){2,3}$/.test(version))throw Error('Invalid version');
 let s=fs.readFileSync(path.join(root,'src/baseline-0.7.10.user.js'),'utf8');const once=(a,b)=>{if(s.split(a).length!==2)throw Error('Expected unique anchor: '+a.slice(0,70));s=s.replace(a,b);};
 s=s.replace(/(\/\/ @version\s+)[^\r\n]+/,'$1'+version);
 once('// @grant        GM_getValue','// @grant        GM_getValue\n// @grant        GM_registerMenuCommand');
 once('// @run-at       document-start','// @updateURL    https://raw.githubusercontent.com/kingsley0849/zhixue-ai-grader/main/zhixue-ai-grader.meta.js\n// @downloadURL  https://raw.githubusercontent.com/kingsley0849/zhixue-ai-grader/main/zhixue-ai-grader.user.js\n// @supportURL   https://github.com/kingsley0849/zhixue-ai-grader/issues\n// @run-at       document-start');
 once("  // 【配置区】只改这一行",'  // 密钥通过油猴菜单“设置 DeepSeek API Key”保存在本机');
 const line=s.match(/  const API_KEY = [^\r\n]+/)[0];once(line,fs.readFileSync(path.join(root,'src/key-settings.js'),'utf8').replace(/^\uFEFF/,'').trimEnd());
 once("'Authorization': 'Bearer ' + API_KEY","'Authorization': 'Bearer ' + getApiKey()");
 once("    if (!API_KEY || API_KEY.indexOf('xxxx') >= 0) {","    const apiKey=getApiKey();\n    if (!apiKey || apiKey.indexOf('xxxx') >= 0) {");
 once("请先在脚本配置区填写 API key",'请在油猴菜单“设置 DeepSeek API Key”中设置密钥');
 once('  function callDeepSeek(payload, onDone, onError, requestOptions) {','  function callDeepSeek(payload, onDone, onError, requestOptions) {\n    if(!getApiKey()||getApiKey().includes(\'xxxx\')){onError(\'请在油猴菜单“设置 DeepSeek API Key”中设置密钥\');return;}');
 once('  boot();',"  if(typeof GM_registerMenuCommand==='function')GM_registerMenuCommand('设置 DeepSeek API Key',configureApiKey);\n  boot();");
 return s;
}
function meta(s){const end=s.indexOf('// ==/UserScript==');if(end<0)throw Error('No userscript metadata');return s.slice(0,end+'// ==/UserScript=='.length)+'\n';}
if(require.main===module){const s=build(process.argv[2]);fs.writeFileSync(path.join(root,'zhixue-ai-grader.user.js'),s);fs.writeFileSync(path.join(root,'zhixue-ai-grader.meta.js'),meta(s));console.log('Built public release without embedded credentials.');}
module.exports={build,meta};
