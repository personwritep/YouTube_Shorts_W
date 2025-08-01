// ==UserScript==
// @name        YouTube Shorts W
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        ショート動画を全画面プレーヤーで閲覧する：ショートカット「F9」
// @author        YouTube Watcher
// @match        https://www.youtube.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL        https://github.com/personwritep/YouTube_Shorts_W/raw/main/YouTube_Shorts_W.user.js
// @downloadURL        https://github.com/personwritep/YouTube_Shorts_W/raw/main/YouTube_Shorts_W.user.js
// @grant        none
// ==/UserScript==


let target=document.querySelector('head');
let monitor=new MutationObserver(changer);
monitor.observe(target, { childList: true });


function changer(){
    let vpath=location.pathname;

    document.addEventListener('keydown', function(event){
        if(event.keyCode=120){ // 「F9」の押下で切替
            if(vpath.includes('/shorts/')){ // ショート動画の場合
                to_wide(); }}});


        function to_wide(){
            let vpath=location.pathname;
            let svideo_id=vpath.split('/shorts/')[1];
            let w_url='https://www.youtube.com/watch?v='+ svideo_id;
            location.href=w_url; }

} // changer()
