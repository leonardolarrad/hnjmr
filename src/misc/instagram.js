
export function instagramPhotos() {
   
    // get posts from instagram
    // acount hospitaljosemanueldelosrios

    // quit response cors


    fetch('https://www.instagram.com/hospitaljosemanueldelosrios/')
    .then(response => response.text())
    .then(html => {
        
        //console.log(dom.querySelector('script'));
        /*
        const { JSDOM } = jsdom;
        const dom = new JSDOM(html);
        console.log(dom.window.document.links);
        */
    })
    .catch(err => console.log(err));
}