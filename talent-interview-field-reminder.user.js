// ==UserScript==
// @name         Talent Interview Field Reminder
// @namespace    https://canonical.com/
// @version      1.1.0
// @author       Ulas Coskun
// @description  Create a reminder to update application custom fields after moving candidates to the Talent Interview stage
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues
// @updateURL    https://github.com/canonical/greenhouse-browser-scripts/raw/refs/heads/main/talent-interview-field-reminder.user.js
// @downloadURL  https://github.com/canonical/greenhouse-browser-scripts/raw/refs/heads/main/talent-interview-field-reminder.user.js
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @grant        none

// @match        https://canonical.greenhouse.io/people/**/applications/**
// ==/UserScript==

(function() {
    'use strict';

    /* Get the 'Talent Interview' button under the 'Move stage' popup field.
    The class for the button of the stage where the candidate is currently in is different from the class of the other buttons.
    Therefore this const will be undefined if the candidate is already in the Talent Interview stage when the page loads.*/
    waitForElementToExist('//div[@title="Talent Interview"]').then(element => {
        // Add eventListener to create an alert when the 'Talent Interview' button is clicked and the candidate isn't already in the Talent Interview stage.
        element.addEventListener('click', () => {
            alert("Please enter the 'HL - Proposed level' and 'HL - Years of relevant experience' information into the Application Custom Fields under the Application tab.")
        });
    });

    function waitForElementToExist(selector) {
        return new Promise(resolve => {
            if (document.evaluate(selector, document, null, XPathResult.ANY_TYPE, null).iterateNext()) {
                resolve(document.evaluate(selector, document, null, XPathResult.ANY_TYPE, null).iterateNext());
                return
            }

            const observer = new MutationObserver(() => {
                if (document.evaluate(selector, document, null, XPathResult.ANY_TYPE, null).iterateNext()) {
                    resolve(document.evaluate(selector, document, null, XPathResult.ANY_TYPE, null).iterateNext());
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                subtree: true,
                childList: true,
            });
        });
    }
})();