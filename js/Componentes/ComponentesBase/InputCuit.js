"use strict";
class InputCuit extends HTMLInputElement {
    constructor() {
        super();
        this.valido = false;
    }
    connectedCallback() {
        this.setAttribute('type', 'text');
    }
    get atr_valido() {
        return this.getAttribute('valido');
    }
    set atr_valido(verdadeoFalso) {
        this.setAttribute('valido', verdadeoFalso);
        if (verdadeoFalso == 'true') {
            this.valido = true;
        }
        else {
            this.valido = false;
        }
    }
    get valueNumerico() {
        return parseInt(this.value.replace(/\D/g, ''));
    }
}
// Registra la nueva clase como un nuevo elemento personalizado
customElements.define('input-cuit', InputCuit, { extends: 'input' });
