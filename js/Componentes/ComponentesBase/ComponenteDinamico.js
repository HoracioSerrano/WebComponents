"use strict";
class ComponenteDinamico extends HTMLElement {
    constructor(conSombra) {
        super();
        this.estilos = new Array();
        if (conSombra == true) {
            this.attachShadow({ mode: 'open' });
        }
    }
    apendizarEstilo(estilo) {
        var _a, _b;
        let nodoEstilo;
        if (estilo instanceof HTMLStyleElement || estilo instanceof HTMLLinkElement) {
            nodoEstilo = estilo;
        }
        else {
            nodoEstilo = document.createElement("style");
            nodoEstilo.appendChild(document.createTextNode(estilo));
        }
        (_a = this.estilos) === null || _a === void 0 ? void 0 : _a.push(nodoEstilo);
        if (this.shadowRoot !== null) {
            (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.appendChild(nodoEstilo);
        }
        else {
            this.appendChild(nodoEstilo);
        }
    }
    apendizarEstiloUrl(url) {
        let nodoLink = document.createElement("link");
        nodoLink.setAttribute('rel', 'stylesheet');
        nodoLink.setAttribute('href', url);
        this.apendizarEstilo(nodoLink);
    }
    quitarEstilo(estilo) {
        var _a;
        (_a = estilo.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(estilo);
    }
}
customElements.define('componente-dinamico', ComponenteDinamico);
