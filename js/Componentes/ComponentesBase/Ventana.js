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
        <div id='cuerpo'>
            <slot>
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
    }
    connectedCallback() {
        this.style.position = "fixed";
        this.style.zIndex = '9';
        this.style.backgroundColor = "#f1f1f1";
        this.style.border = "1px solid #d3d3d3";
        //this.style.textAlign="center";
        this.dragElement(this);
        this.btn_minimizar.onclick = () => { this.minimizar(this); };
        this.btn_restaurar.onclick = () => { this.restaurar(this); };
        this.btn_cerrar.onclick = () => { this.cerrar(this); };
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
    minimizar(ventana) {
        ventana.cuerpo.style.display = "none";
    }
    restaurar(ventana) {
        ventana.cuerpo.style.display = "block";
    }
    cerrar(ventana) {
        var _a;
        (_a = ventana.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(ventana);
    }
}
customElements.define("ventana-arrastrable", Ventana);
