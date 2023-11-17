class InputCuit extends HTMLInputElement {
    public valido: boolean;
    constructor() {
        super();
        this.valido = false;        
    }
    connectedCallback(){
        this.setAttribute('type','text');
    }
    
    get atr_valido(): string|null {
        return this.getAttribute('valido'); 
    }
    set atr_valido(verdadeoFalso: string){
        this.setAttribute('valido', verdadeoFalso);
        if (verdadeoFalso == 'true'){
            this.valido = true;
        }else{
            this.valido = false;
        }
    }
    get valueNumerico(): number {
        return parseInt(this.value.replace(/\D/g, ''));
    }
}

  // Registra la nueva clase como un nuevo elemento personalizado
  customElements.define('input-cuit', InputCuit, { extends: 'input' });