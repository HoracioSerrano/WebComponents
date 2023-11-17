class ComponenteDinamico extends HTMLElement{
    private estilos: Array<HTMLStyleElement|HTMLLinkElement> = new Array();
    constructor(conSombra:boolean|null){
        super();
        if (conSombra==true){
            this.attachShadow({mode:'open'});
        }        
    }
    apendizarEstilo(estilo: string|HTMLStyleElement|HTMLLinkElement){
        let nodoEstilo: HTMLStyleElement;
        if (estilo instanceof HTMLStyleElement || estilo instanceof HTMLLinkElement){
            nodoEstilo = estilo;
        }else{
            nodoEstilo = document.createElement("style")
            nodoEstilo.appendChild(document.createTextNode(estilo));            
        }
        this.estilos?.push(nodoEstilo);
        if (this.shadowRoot!==null){
            this.shadowRoot?.appendChild(nodoEstilo);
        }else{
            this.appendChild(nodoEstilo);
        }
    }
    apendizarEstiloUrl(url: string){
        let nodoLink:HTMLLinkElement = document.createElement("link");
        nodoLink.setAttribute('rel','stylesheet');
        nodoLink.setAttribute('href',url);
        this.apendizarEstilo(nodoLink);
    }
    quitarEstilo(estilo: HTMLStyleElement){
        estilo.parentElement?.removeChild(estilo);
    }

    /*mapeo automatico a campos*/
}
customElements.define('componente-dinamico', ComponenteDinamico);