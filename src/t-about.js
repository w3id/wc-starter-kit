import {render,html} from '../node_modules/lit-html/lit-html.js'; 
import TImg from './t-img.js';

class TAbout extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    get template(){
        return html`
            <style>
                :host{
                    display:block;
                }
                t-img{
                    height:75vh;
                }
                #container{
                    padding:16px;
                }
            </style>
            <t-img src="img/featured.jpg" size="cover"></t-img>
            <div id="container">
                
                <h1>About Pages</h1>
            </div>
        `;
    }

    render(){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
        });
	}
}
customElements.define('t-about',TAbout);