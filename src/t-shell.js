import {render,html} from '../node_modules/lit-html/lit-html.js'; 
import TRouter from './t-router.js';

export default class TShell extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
        this.activePage=``;
    }

    connectedCallback() {

        this.router=new TRouter;
        
        this.router.on('/',async ()=>{
            
            this.importModule('/src/t-app.js');
            this.activePage=html`<t-app active="${window.location.hash}"></t-app>`;
            this.render(true);
        });

        this.router.on('/about',async ()=>{
            this.importModule('/src/t-about.js');
            this.activePage=html`<t-about></t-about>`;
            this.render(true);
        });

        this.router.on('/contact',async ()=>{
            this.importModule('/src/t-contact.js');
            this.activePage=html`<t-contact></t-contact>`;
            this.render(true);
        });

        if(this.router.activeRoute===null){
            this.router.goTo('/');
        }
        
        this.render();
    }

    importModule(url){
        const script=document.createElement('script');
        script.setAttribute('src',url);
        script.setAttribute('type','module');
        document.head.appendChild(script);
    }

    
    render(toggle){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
            if(toggle===true){
                this._shadowRoot.querySelector('#drawer').classList.remove('active');
            }
        });
    }

    get template(){
        return html`
        <style>
            :host{
                display:block;
            }
            a{
                text-decoration:none;
            }
            #drawer-container{
                position: relative;
                height: 100vh;
                width: 100vw;
            }

            header{
                padding:0 1rem;
            }

            #drawer{
                width:70vw;
                height: 100vh;
                left:-70vw;
                top:0;
                position: fixed;
                background: #FFF;
                transition-duration: 0.2s;
                z-index:1000;
            }

            #drawer ul{
                list-style:none;
                padding-left:1rem;
            }

            #drawer.active{
                left:0;
                border-right: 1px solid #CCC;
            }

            #drawer ul li{
                line-height:4rem;
            }
            #nav-toggle{
                position: fixed;
                left: 1rem;
                top:1rem;
                font-size: 3rem;
                text-decoration: none;
                color: #FFF;
                z-index:100;
                vertical-align:top;
                height: 50px;
                width: 50px;
                text-align: center;
            }
            #nav-close{
                position: absolute;
                right: 2rem;
                font-size: 3rem;
                top:1rem;
                padding:0;
                margin:0;
                text-decoration:none;
            }

             @media (min-width: 40.0rem) { 
                #arrow-down {
                    font-size: 8rem;
                    text-decoration: none;
                    color: #F0F0F0;
                    z-index:100;
                    bottom:0;
                    position:absolute;
                    left:50%;
                    transform: translateX(-50%);
                }    

                #drawer{
                    width:70vw;
                    right:2rem;
                    top:1rem;
                    left:30vw;
                    height:3rem;
                    background:transparent;
                    position: absolute;
                }

                #drawer.active{
                    left:30vw;
                    border-right: none;
                }
                
                #drawer ul{
                    display:flex;
                    flex-direction:row;
                    justify-content:flex-end;
                    margin:0 4rem 0 0;
                }

                #drawer ul li{
                    padding:1rem 2rem 1rem 4rem;
                    text-align:right;
                    line-height:2rem;
                }
                #drawer ul li a{
                    color:#FFF;
                }
                #drawer header,#nav-close,#nav-toggle{
                    display:none;
                }
             }

        </style>
        <div id="drawer-container">
                <a id="nav-toggle" href="#" @click=${(e) => { e.preventDefault(); this._shadowRoot.querySelector('#drawer').classList.toggle('active')}}>&#9776;</a>
                <div id="drawer">
                        <a id="nav-close" href="#" @click=${(e) => { e.preventDefault(); this._shadowRoot.querySelector('#drawer').classList.toggle('active')}}>&times;</a>
                        <header>
                                <h2>Menu</h2>
                        </header>
                        <ul id="menu">
                            <li><a href="/">Home</a></li>
                            <li><a href="/#get-started">Get Started</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                            
                        </ul>
                </div>
                <div id="content-container">
                    ${this.activePage}
                </div>
        </div>
        `;
    }
    
}
customElements.define('t-shell', TShell);