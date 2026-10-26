  function getApiKey(){try{const value=GM_getValue('zx_api_key_v1','');return typeof value==='string'?value.trim():'';}catch{return '';}}
  function configureApiKey(){
    if(state.running||state.grading||state.awaitingPaper||state.supplementBusy){toast('请先停止批量与当前请求，再设置密钥');return;}
    const entered=window.prompt('输入你自己的 DeepSeek API Key。仅保存在本浏览器油猴存储中，不写入公开脚本。取消则保持原设置。','');
    if(entered===null)return;const key=entered.trim();
    if(!key||/\s/.test(key)||key.includes('xxxx')){toast('密钥为空或为占位内容，原设置未改变');return;}
    try{GM_setValue('zx_api_key_v1',key);toast('DeepSeek 密钥已保存在本机，后续更新无需重新填写');setStatus('密钥已设置，可以开始判分');}catch{toast('密钥保存失败，原设置未改变');}
  }
