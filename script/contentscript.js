// URL of the external CSS file from the CDN
const cssCdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

// Create a link element for the external CSS
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.type = 'text/css';
cssLink.href = cssCdnUrl;

// Append the link element to the document's head
document.head.appendChild(cssLink);

document.addEventListener('click', handleClick);

function handleClick(event){
    animate(event);
    setTimeout(function(){
        event.target.style.display="none";
        playAudio();
    }, 2000);
}

function playAudio(){
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    fetch(chrome.runtime.getURL('../pop.mp3'))
      .then(response => response.arrayBuffer())
      .then(data => audioContext.decodeAudioData(data))
      .then(buffer => {
        // Create an audio buffer source
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);

        // Play the audio
        source.start(0);
      })
      .catch(error => {
        console.error('Error loading the sound:', error);
      });
}

function animate(event){
    event.target.classList.add('animate__animated', 'animate__bounce');
    event.target.style.setProperty('--animate-duration', '1s');
}