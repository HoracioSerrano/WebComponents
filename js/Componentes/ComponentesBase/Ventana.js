"use strict";
class Ventana extends HTMLElement {
    constructor() {
        super();
        this.template = `
        <style>  
            #encabezado {
                padding: 10px;
                cursor: move;
                z-index: 10;
                background-color: #2196F3;
                color: #fff;
                display: flex; 
                flex-direction: row; 
                justify-content: space-between; 
                align-items: center;                
            }         
            #spinner{
                position:absolute;
                width:100%;
                height:100%;
                display:none;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: rgba(255,255,255,0.7);
            }
            #animation {
                content:'';
                display:block;
                width:40px;height:40px;
                border-style:solid;
                border-color:black;
                border-top-color:transparent;
                border-width: 4px;
                border-radius:50%;
                -webkit-animation: spin .8s linear infinite;
                animation: spin .8s linear infinite;
            }            
            @-webkit-keyframes spin {
                from {-webkit-transform:rotate(0deg);}
                to {-webkit-transform:rotate(360deg);}
            }            
            @keyframes spin {
                from {transform:rotate(0deg);}
                to {transform:rotate(360deg);}
            }
        </style>
        <div id='encabezado'>
            <div>
                <p id='titulo' style="margin: 0px;">Titulo</p>
            </div>
            <div>
                <button id='btn_minimizar'>_</button>
                <button id='btn_restaurar'>[]</button>
                <button id='btn_cerrar'>X</button>
            </div>
        </div>
        <div id='cuerpo' style='position:relative;'>
            <div id='spinner'><div id='animation'></div></div>
            <slot id = 'slot'>
        </div>
    `;
        this.me = this;
        this.shadow = this.attachShadow({ mode: "open" });
        let temp = document.createElement('template');
        temp.innerHTML = this.template;
        this.shadow.appendChild(temp.content.cloneNode(true));
        this.encabezado = this.shadow.getElementById('encabezado');
        this.titulo = this.shadow.getElementById('titulo');
        this.btn_minimizar = this.shadow.getElementById('btn_minimizar');
        this.btn_restaurar = this.shadow.getElementById('btn_restaurar');
        this.btn_cerrar = this.shadow.getElementById('btn_cerrar');
        this.cuerpo = this.shadow.getElementById('cuerpo');
        this.spinner = this.shadow.getElementById('spinner');
    }
    connectedCallback() {
        this.style.position = "fixed";
        this.style.backgroundColor = "#f1f1f1";
        this.style.border = "1px solid #d3d3d3";
        this.dragElement(this);
        this.btn_minimizar.onclick = this.minimizar.bind(this);
        this.btn_restaurar.onclick = this.restaurar.bind(this);
        this.btn_cerrar.onclick = this.cerrar.bind(this);
        this.onmousedown = this.traerAlFrente.bind(this);
    }
    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.encabezado.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    attributeChangedCallback(atributo, viejoValor, nuevoValor) {
        if (atributo == 'titulo') {
            this.titulo.childNodes.forEach(element => {
                this.titulo.removeChild(element);
            });
            this.titulo.appendChild(document.createTextNode(nuevoValor));
        }
    }
    minimizar() {
        this.cuerpo.style.display = "none";
    }
    restaurar() {
        this.cuerpo.style.display = "block";
    }
    cerrar() {
        var _a, _b;
        /*Si es cierto que este elemento esta en un shadow root
        y es cierto que ese shadow root esta dentro de un host,
        llama al padre del host y eliminalo*/
        const root = this.getRootNode();
        const host = root.host;
        if (root != null && root != undefined && host != null && host != undefined) {
            try {
                (_a = host.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(host);
            }
            catch (_c) { }
        }
        else {
            (_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(this);
        }
    }
    traerAlFrente() {
        Ventana.z = Ventana.z + 1;
        this.style.zIndex = Ventana.z.toString();
    }
    bloquear(bloquear) {
        if (bloquear) {
            this.spinner.style.display = 'flex';
        }
        else {
            this.spinner.style.display = 'none';
        }
    }
}
Ventana.observedAttributes = ["titulo"];
Ventana.z = 1;
customElements.define("ventana-arrastrable", Ventana);
