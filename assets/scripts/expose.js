// expose.js

window.addEventListener('DOMContentLoaded', init);

// sets horn image and horn audio
function displayHorn(){
  // get select element
  let hornSelect = document.getElementById('horn-select');
  // get value of selected option
  let selectedHorn = hornSelect.options[hornSelect.selectedIndex].value;
  // get references to horn and audio elements
  let hornImg = document.querySelector("img");
  let hornAudio = document.querySelector("audio");
  // set horn image and horn audio given the selected option
  switch (selectedHorn) {
    case 'air-horn':
      hornImg.setAttribute("src", "assets/images/air-horn.svg");
      hornAudio.setAttribute("src", "assets/audio/air-horn.mp3");
      hornImg.setAttribute("alt", "Air Horn Image");
      break;
    case 'car-horn':
      hornImg.setAttribute("src", "assets/images/car-horn.svg");
      hornAudio.setAttribute("src", "assets/audio/car-horn.mp3");
      hornImg.setAttribute("alt", "Car Horn Image");
      break;
    case 'party-horn':
      hornImg.setAttribute("src", "assets/images/party-horn.svg");
      hornAudio.setAttribute("src", "assets/audio/party-horn.mp3");
      hornImg.setAttribute("alt", "Party Horn Image");
      break;
    default:
      hornImg.setAttribute("src", "assets/images/no-image.png");
      hornImg.setAttribute("alt", "No image selected");
  }
}

// sets volume and speaker icon
function displaySpeaker(){
  // gets volume element
  let audioSelect = document.getElementById('volume');
  // gets selected volume value
  let volumeVal = audioSelect.value;
  let hornAudio = document.querySelector("audio");
  let speakerImg = document.querySelector("div img");
  // sets volume icon
  if(volumeVal == 0){
    speakerImg.setAttribute("src", "assets/icons/volume-level-0.svg");
    speakerImg.setAttribute("alt", "Volume level 0");
  }
  else if(volumeVal < 33){
    speakerImg.setAttribute("src", "assets/icons/volume-level-1.svg");
    speakerImg.setAttribute("alt", "Volume level 1");
  }
  else if(volumeVal < 67){
    speakerImg.setAttribute("src", "assets/icons/volume-level-2.svg");
    speakerImg.setAttribute("alt", "Volume level 2");
  }
  else{
    speakerImg.setAttribute("src", "assets/icons/volume-level-3.svg");
    speakerImg.setAttribute("alt", "Volume level 3");
  }
  // sets mp3 volume
  hornAudio.volume = volumeVal/100;
}

function init() {
  document.getElementById('horn-select').addEventListener('change', displayHorn);

  document.getElementById('volume').addEventListener('change', displaySpeaker);

  const playAudio = document.querySelector("button");
  let hornAudio = document.querySelector("audio");
  
  // example of eventListener + internal function
  // plays sound on button click + handles confetti case
  playAudio.addEventListener('click', ()=>{
    let audioSelect = document.getElementById('volume');
    let volumeVal = audioSelect.value;
    let hornSelect = document.getElementById('horn-select');
    let selectedHorn = hornSelect.options[hornSelect.selectedIndex].value;
    if(volumeVal != 0 && selectedHorn == 'party-horn'){
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
    hornAudio.play();
  });
}