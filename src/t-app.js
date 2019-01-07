import {render,html} from '../node_modules/lit-html/lit-html.js'; 
import TImg from './t-img.js';

export class TApp extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
    }  

    static get observedAttributes() {return ['active']; }

    render(){
        render(this.template,this._shadowRoot);
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name==='active'){
            this.scrollTo(newValue);
        }
        this.render();
    }

    connectedCallback(){
        this.render();
        this.scrollTo(this.getAttribute('active'));
    }

    get template(){
        return html`
        <style>
            :host{
                display:block;
                margin:0;
                padding:0;
            }

            a{
                text-decoration:none;
            }

            
            #featured-image{
                background: url(../img/featured.jpg) no-repeat center center fixed;
                background-size: cover;
                height: 100vh;
                margin-bottom:5rem;
                color:#FFF;
                position:relative;

                display: flex;
                align-items: center;
                justify-content: center;
            }
            #arrow-down{
                display: none;
            }
            #featured-image .dark-bg{
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                left:0;
                background-color:#000;
                opacity:0.5;
            }
            #featured-image .content{
                position:relative;
                text-align:center;
                margin:0 auto;
                width:80%;
                // top:20%;
                font-size:1.2em;
            }
            #featured-image .venue{
                font-size:0.8em;
            }
            header{
                margin:16px;
            }

           .block-content{
               margin:0 auto 8rem auto;
               padding:0 1rem;
               max-width:960px;
           }
           
           .block-content h2{
               width:100%;
           }

            .app-container{
                text-align:center; 
            }

                
            #venue{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-content:left;
            }
            #venue > * {
                flex-grow:1;
            }

            #venue t-img{
                height:300px;
            }
            
            #sponsor-list{
                display:flex;
                flex-direction:row;
                flex-wrap:wrap;
                justify-content:center;
                align-content:center;
            }
            #sponsor-list t-img{
                width:320px;
                height:320px;
            }

            .block-content ul{
                column-count:3;
                padding: 0;
                margin:0;
            }
            .block-content ul li{
                list-style-type:none;
                margin-bottom:1em;
            }

            

            /* Larger than mobile screen */
            @media (min-width: 40.0rem) {                 
                #community-list, #sponsor-list,#venue{
                    flex-direction:row;
                }
                
                #venue > * {
                    flex-grow:1;
                    width:40%;
                }

                #venue t-img{
                    height:300px;
                }
                
                #venue article{
                    text-align:left;
                    padding:0 2rem;
                }
            }


        </style>
        <div class="app-container">
            <div id="featured-image">
                <div class="dark-bg"></div>
                <a id="arrow-down" href="#main-content" @click=${(e) => this.scrollTo(e,'#tentang')}>&#8964;</a>
                <div class="content">
                    <h1>WC Kit</h1>
                    <h4>Start your web development with this starter kit.</h4>
                    <p>Based on web component and free to use your own favorit build tool</p>
                </div>
            </div>
            <div id="main-content">
                <div id="get-started" class="block-content">
                    <h2>Get Started</h2>
                    <article>
                    <p>This is a template to start a Progressive Web App (PWA) development. It's provide basic mobile responsive layout without any extra modules. For rendering purpose, it's using Lit-HTML to update the shadow-dom in each component.
                    </p>
                    <p>There are 2 basic components that's come with this template:</p>
                    <p>t-img custom element that provide lazy load and easy layouting mechanism.</p>
                    <p>TRouter component, a basic routing that utilize history.api to handle routing.</p>
               
                  
                    </article>
                </div>               
                <div id="footer" class="block-content">
                    <p>Develop by <a href="//github.com/tyohan">@tyohan</a>. Available in our <a href="//github.com/w3id/wc-starter-kit">Github</a>.</p>
                    <p>Join our <a href="https://t.me/wwwid_pwa">group discussion</a> and read our <a href="https://medium.com/wwwid">publication</a></p>
                </div>
            </div>
        </div>
        `;
    }

    scrollTo(selector){
        if(selector.length>0){
            const el=this._shadowRoot.querySelector(selector);
            if(el!==null){
                el.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
    }
}

customElements.define('t-app',TApp);
