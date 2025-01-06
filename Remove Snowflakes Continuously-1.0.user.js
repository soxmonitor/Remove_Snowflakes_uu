// ==UserScript==
// @name         Remove Snowflakes Continuously
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Continuously remove snowflakes from the webpage
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 初始删除现有的 snowflake 元素
    var snowflakes = document.getElementsByClassName("snowflake");
    while(snowflakes[0]) {
        snowflakes[0].parentNode.removeChild(snowflakes[0]);
    }

    // 创建 MutationObserver 来持续删除新生成的 snowflake 元素
    var observer = new MutationObserver(function(mutationsList, observer) {
        mutationsList.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.classList && node.classList.contains("snowflake")) {
                    node.parentNode.removeChild(node);
                }
            });
        });
    });

    // 监听网页内容的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

