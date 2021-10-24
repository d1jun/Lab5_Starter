// explore.js

window.addEventListener('DOMContentLoaded', init);

// source: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
function init() {
  var synth = window.speechSynthesis;
  var voiceSelect = document.querySelector('select');
  var voices = [];
  // directly from MDN source
  function populateVoiceList() {
    voices = synth.getVoices();
    for(var i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  // add the different voice options to the select box
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // adapted from MDN source
  document.querySelector('button').addEventListener('click', ()=>{
    let text = document.getElementById('text-to-speak').value;
    // don't open mouth if textarea is empty
    if(text == ""){
      return;
    }
    let utterance = new SpeechSynthesisUtterance(text);
    // gets voice of selected option
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(var i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterance.voice = voices[i];
      }
    }
    // sets smiling open when speaking
    let face = document.querySelector("img");
    face.setAttribute("src", "assets/images/smiling-open.png");
    face.setAttribute("alt", "Open Smiling Face");
    speechSynthesis.speak(utterance);
    utterance.onend = function(event) {
      face.setAttribute("src", "assets/images/smiling.png");;
    }
  });
}