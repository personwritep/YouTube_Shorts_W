// ==UserScript==
// @name        YouTube Shorts W
// @namespace        http://tampermonkey.net/
// @version        0.5
// @description        ショート動画を全画面プレーヤーで閲覧する：ショートカット「F9」
// @author        YouTube Watcher
// @match        https://www.youtube.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL        https://github.com/personwritep/YouTube_Shorts_W/raw/main/YouTube_Shorts_W.user.js
// @downloadURL        https://github.com/personwritep/YouTube_Shorts_W/raw/main/YouTube_Shorts_W.user.js
// @grant        none
// ==/UserScript==


let target=document.querySelector('head title');
let monitor=new MutationObserver(changer);
monitor.observe(target, { childList: true });

changer();

function changer(){
    let vpath=location.pathname;
    let video_elem;
    let skbar;

    let rate=localStorage.getItem('YouTube_slowrate');
    if(!rate){
        rate=0.5;
        localStorage.setItem('YouTube_slowrate', rate); }


    if(vpath.includes('/shorts/')){
        video_elem=document.querySelector('#shorts-player video');
        if(video_elem){
            document.addEventListener('keydown', function(event){
                if(event.keyCode==120){ // 「F9」の押下で切替
                    to_wide(); }
                if(event.keyCode==37){ // 「⇦」の押下
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    trim_back(video_elem); }
                if(event.keyCode==39){ // 「⇨」の押下
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    trim_next(video_elem); }
                if(event.keyCode==49){ // 「1」の押下
                    slow_set(video_elem, 1); }
                if(event.keyCode==50){ // 「2」の押下
                    slow_set(video_elem, 2); }
                if(event.keyCode==51){ // 「3」の押下
                    slow_set(video_elem, 3); }
                if(event.keyCode==52){ // 「4」の押下
                    slow_set(video_elem, 4); }
                if(event.keyCode==53){ // 「5」の押下
                    slow_set(video_elem, 5); }
                if(event.altKey){ //「Alt」キーの押下
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    slow(video_elem); }});

        } // if(video_elem)
    } // if(vpath.includes('/shorts/'))

    else{
        video_elem=document.querySelector('#movie_player video');
        if(video_elem){
            document.addEventListener('keydown', function(event){
                if(event.keyCode==120){ // 「F9」の押下で切替
                    to_shorts(); }});

        } // if(video_elem)
    } // else


    function to_wide(){
        let vpath=location.pathname;
        let svideo_id=vpath.split('/shorts/')[1];
        let w_url='https://www.youtube.com/watch?v='+ svideo_id;
        location.href=w_url; }


    function to_shorts(){
        let vhref=location.href;
        let svideo_id=vhref.split('/watch?v=')[1];
        let s_url='https://www.youtube.com/shorts/'+ svideo_id;
        if(document.referrer==s_url){ // ショート動画から遷移した場合のみ戻れる
            location.href=s_url; }}


    function trim_back(video_elem){ //「⇦」キー 2sec前へジャンプ
        video_elem.currentTime -=2; }


    function trim_next(video_elem){ //「⇨」キー 2sec後へジャンプ
        video_elem.currentTime +=2; }


    function slow_set(video_elem, n){
        if(n==1){
            rate=0.1; }
        else if(n==2){
            rate=0.2; }
        else if(n==3){
            rate=0.3; }
        else if(n==4){
            rate=0.4; }
        else if(n==5){
            rate=0.5; }
        else {
            rate=0.5; }
        localStorage.setItem('YouTube_slowrate', rate);
        skbar=document.querySelector('.ytPlayerProgressBarHost');
        if(skbar){
            skbar.style.filter='brightness(2)'; }
        video_elem.playbackRate=rate; }


    function slow(video_elem){
        let skbar=document.querySelector('.ytPlayerProgressBarHost');
        let speed=video_elem.playbackRate;
        if(speed==1){
            if(skbar){
                skbar.style.filter='brightness(2)'; }
            video_elem.playbackRate=rate; }
        else{
            if(skbar){
                skbar.style.filter=''; }
            video_elem.playbackRate=1; }}

} // changer()
