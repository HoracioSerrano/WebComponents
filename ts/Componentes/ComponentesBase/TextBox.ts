const TextBoxTemplate =  `
    <div id='div' style='display:flex'>
        <label id='label' for="input">HTML</label>
        <input id='input' type='text'/>
    </div>
`

class TextBox extends HTMLElement {
    input: HTMLInputElement;
    label: HTMLLabelElement;
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        let template = document.createElement('template');
        template.innerHTML = TextBoxTemplate;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.input = (this.shadowRoot?.querySelector('input') as HTMLInputElement);
        this.label = (this.shadowRoot?.getElementById('label') as HTMLLabelElement);
    }
    get value():string{
        return this.input?.value;
    }
    set value(val:string){
        this.input.value = val;
    }
}

customElements.define('text-box', TextBox);
