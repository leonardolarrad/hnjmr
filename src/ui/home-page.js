
import { getUser } from '../api/auth';
import { InstagramEmbed } from 'react-social-media-embed';
import { instagramPhotos } from '../misc/instagram';

function getSourceAsDOM(url)
{
    const xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    const parser=new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html", {scripting: 'enabled'});      
}


export default function HomePage() {

  fetch('https://www.instagram.com/hospitaljosemanueldelosrios/')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      console.log(doc);
  });
  
  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="flex flex-wrap justify-start  w-full h-full space-y-4 space-x-4 overflow-auto">
        
      </div>
    </div>
  );
}