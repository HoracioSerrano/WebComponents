const TextBoxTemplate =  `
    <div id='div' style='display:flex'>
        <label id='label' for="html">HTML</label>
        <input id='text' type='text'/>
    </div>
`

class TextBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        let template = document.createElement('template');
        template.innerHTML = TextBoxTemplate;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('text-box', TextBox);
