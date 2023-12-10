"use strict";
class UsaVentana extends HTMLElement {
    constructor() {
        super();
        this.template = `
    <ventana-arrastrable>
        <div style="height: 300px; width: 400px; background-color: beige;">
            <button>boton</button>
        </div>
    </ventana-arrastrable>
    `;
        this.shadow = this.attachShadow({ mode: "open" });
        let temp = document.createElement('template');
        temp.innerHTML = this.template;
        this.shadow.appendChild(temp.content.cloneNode(true));
    }
    connectedCallback() {
    }
}
customElements.define("usa-ventana", UsaVentana);
