// ==UserScript==
// @name         智学网 AI 批改助手 - B模型主导
// @namespace    zhixue-ai-marking
// @version      0.7.11
// @description  智学网按题号批改：题目/答案用图片提交，AI 自动判分，支持手动/全自动批量，字迹难辨自动转人工，带评分标准库
// @author       teacher-assistant
// @match        https://*.zhixue.com/*
// @match        https://zhixue.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @connect      api.deepseek.com
// @connect      *.aliyuncs.com
// @connect      *.zhixue.com
// @updateURL    https://raw.githubusercontent.com/kingsley0849/zhixue-ai-grader/main/zhixue-ai-grader.meta.js
// @downloadURL  https://raw.githubusercontent.com/kingsley0849/zhixue-ai-grader/main/zhixue-ai-grader.user.js
// @supportURL   https://github.com/kingsley0849/zhixue-ai-grader/issues
// @run-at       document-start
// ==/UserScript==
