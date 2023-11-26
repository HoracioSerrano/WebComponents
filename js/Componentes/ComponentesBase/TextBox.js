"use strict";
const TextBoxTemplate = `
    <div id='div' style='display:flex'>
        <label id='label' for="html">HTML</label>
        <input id='text' type='text'/>
    </div>
`;
class TextBox extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.attachShadow({ mode: 'open' });
        let template = document.createElement('template');
        template.innerHTML = TextBoxTemplate;
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('text-box', TextBox);
