export default function CoverController(){
    const cover = document.querySelector("div.cover");
    const button = cover.querySelector("button");
    const h1 = cover.querySelector("h1");

    this.show = ()=>{
        cover.style.visibility = "visible";
    }
    
    this.hide = ()=>{
        cover. style.visibility = "hidden";
    }
    
    this.getRestart = ()=>{
        return button;
    }
    this.setMessage = (message) =>{
        h1.textContent = `Winner: ${message}!!!`;
    }
}