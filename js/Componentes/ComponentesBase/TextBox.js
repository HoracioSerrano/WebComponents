"use strict";
const TextBoxTemplate = `
    <div id='div' style='display:flex'>
        <label id='label' for="input">HTML</label>
        <input id='input' type='text'/>
    </div>
`;
class TextBox extends HTMLElement {
    constructor() {
        var _a, _b, _c;
        super();
        this.attachShadow({ mode: 'open' });
        let template = document.createElement('template');
        template.innerHTML = TextBoxTemplate;
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template.content.cloneNode(true));
        this.input = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('input');
        this.label = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById('label');
    }
    get value() {
        var _a;
        return (_a = this.input) === null || _a === void 0 ? void 0 : _a.value;
    }
    set value(val) {
        this.input.value = val;
    }
}
customElements.define('text-box', TextBox);
