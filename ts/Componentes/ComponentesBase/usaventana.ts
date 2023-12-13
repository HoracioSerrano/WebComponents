class UsaVentana extends HTMLElement {    
    template:string = `
        <ventana-arrastrable id="ventana">
            <div style="height: 300px; width: 400px; background-color: beige;">
                <button>boton</button>
            </div>
        </ventana-arrastrable>
    `;
    ventana: Ventana;
    shadow: ShadowRoot;
    constructor() {
        super();           
        this.shadow = this.attachShadow({ mode: "open" });
        let temp = document.createElement('template');
        temp.innerHTML = this.template;
        this.shadow.appendChild(temp.content.cloneNode(true));
        this.ventana = this.shadow.getElementById("ventana") as Ventana;
    }
    connectedCallback(){
        this.ventana?.bloquear(true);
    }
}
customElements.define("usa-ventana", UsaVentana);