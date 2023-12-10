"use strict";
class Ventana extends HTMLElement {
    constructor() {
        super();
        this.template = `
        <style>
            #mydiv {
                position: absolute;
                z-index: 9;
                background-color: #f1f1f1;
                border: 1px solid #d3d3d3;
                text-align: center;
            }      
            #encabezado {
                padding: 10px;
                cursor: move;
                z-index: 10;
                background-color: #2196F3;
                color: #fff;
            }
        </style>
        <div id='encabezado'>
            Click para arrastrar
        </div>
        <div id='cuerpo'>
            cuerpo
        </div>
    `;
        this.shadow = this.attachShadow({ mode: "open" });
        let temp = document.createElement('template');
        temp.innerHTML = this.template;
        this.shadow.appendChild(temp.content.cloneNode(true));
        this.encabezado = this.shadow.getElementById('encabezado');
    }
    connectedCallback() {
        this.style.position = "fixed";
        this.style.zIndex = '9';
        this.style.backgroundColor = "#f1f1f1";
        this.style.border = "1px solid #d3d3d3";
        this.style.textAlign = "center";
        this.dragElement(this);
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
}
customElements.define("ventana-arrastrable", Ventana);