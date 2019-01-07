import {render,html} from '../node_modules/lit-html/lit-html.js'; 
export default class TImg extends HTMLElement {
	constructor() {
        super();
        this.src='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
        this.dataSrc=null;
        this.size='cover';
        this.position='top';
        this.rounded=false;
        this.isLoaded=false;
        this.observer=null;
        this._shadowRoot=this.attachShadow({mode: 'open'});
    }

    setupImageLazyLoad () {
        this.observer = new IntersectionObserver((entries) => {
            for (let entry of entries) {
                if (entry.isIntersecting && entry.target.isLoaded===false) {
                    entry.target.src=entry.target.dataSrc!==null?entry.target.dataSrc:entry.target.src;
                    entry.target.isLoaded=true;
                    this.render();
                    this.observer.unobserve(entry.target);
                }
            }
        });

        this.observer.observe(this);
    }
  
	static get observedAttributes() { return ['src','size','position','rounded']; }

	attributeChangedCallback(name, oldValue, newValue) {
		switch(name){
            case 'src':
                if(this.isLoaded)
                    this.src = newValue;
                else
                    this.dataSrc=newValue;
                break;
            case 'size':
                this.size = newValue;
                break;
            case 'position':
                this.position = newValue;
                break;
            case 'rounded':
                this.rounded = newValue === null ? false : true;
                break;
		}
		this.render();
    }
    
    get template(){
        return html`
        <style>
            :host{
                display:block;
                position:relative;
            }
            img{
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                width:100%;
                height:100%;
            }
        </style>
        <img src="${this.src}" style="border-radius:${this.rounded ? '100%' : '0'};object-fit:${this.size};"/>
        `;
    }

	connectedCallback() {
        this.render();
        this.setupImageLazyLoad();
	}
    
	render(){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
        });
	}
	
}
customElements.define('t-img', TImg);