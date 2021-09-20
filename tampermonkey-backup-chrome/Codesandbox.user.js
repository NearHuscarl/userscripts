// ==UserScript==
// @name         Codesandbox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Codesandbox UI helpers
// @author       NearHuscarl
// @match        https://codesandbox.io/s/*
// @icon         https://www.google.com/s2/favicons?domain=codesandbox.io
// @grant        none
// ==/UserScript==

'use strict';

(function() {
    console.log('Execute tamperscript...');

    function addShareButton() {
        const buttonToolbarEl = document.querySelector('header > :last-child');
        const menuBtnEl = document.querySelector('header > :last-child > :last-child button');
        const btnClasses = menuBtnEl.classList;
        const shareButton = document.createElement('button')

        shareButton.classList = btnClasses;
        shareButton.textContent = 'S';
        shareButton.addEventListener("click", () => {
            const markdownText = `[![Codesandbox Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](${window.location.href})`;
            navigator.clipboard.writeText(markdownText);
            alert('Copied share button markdown text!');
        });

        buttonToolbarEl.appendChild(shareButton);
    }

    const headerEl = document.querySelector('header');
    const config = { childList: true };
    const isToolbarEl = el => {
        return [...el?.classList || []].some(x => x.includes('Actions'));
    };
    const observer = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                if (isToolbarEl(mutation.addedNodes[0])) {
                    addShareButton()
                    observer.disconnect();
                }
            }
        }
    });


    observer.observe(headerEl, config);
})();










