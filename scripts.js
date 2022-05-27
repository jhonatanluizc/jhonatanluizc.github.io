'use strict';

var Scripts = {

    /// :: Initialize all functions.
    Init: function () {

        Scripts.CodePreview();
    },

    /// :: Code preview.
    CodePreview: function () {

        /// :: Base.
        var codePreview = document.querySelector('.code-preview code pre');
        var text = codePreview.textContent;

        /// :: Replace class names.
        text.match(/\.[A-z]* /g).forEach(value => {
            text = text.replace(value, '<span style="color:#d7ba70">' + value + '</span>');
        });

        /// :: Replace atributes.
        text.match(/ \w*: /g).forEach(value => {
            text = text.replaceAll(value, '<span style="color:#8fd2f8">' + value.replace(':', '<span style="color:#fff">:</span>') + '</span>');
        });

        /// :: Replace outers characters.
        text = text.replace(/{/g, '<span style="color:#ffd700">{</span>');
        text = text.replace(/}/g, '<span style="color:#ffd700">}</span>');
        text = text.replace(/;/g, '<span style="color:#fff">;</span>');

        /// :: Apply changes.
        codePreview.innerHTML = text;
    }

}

/// :: Execute initial functions.
Scripts.Init();