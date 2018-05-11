import appState from './../state.js';

let audioContext = null;
let analyser = null;
let bufferLength = null;
let dataArray = null;

const initAudio = function(callback){
  try {
    if (typeof AudioContext !== 'undefined') {
        audioContext = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
        audioContext = new webkitAudioContext();
    } else {
        appState.usingWebAudio = false;
    }
  } catch(e) {
      appState.usingWebAudio = false;
  }
  analyser = audioContext.createAnalyser();
  analyser.connect(audioContext.destination);
  analyser.fftSize = 32;
  bufferLength = analyser.frequencyBinCount; 
  dataArray = new Uint8Array(bufferLength);
  callback();
}

export {initAudio, audioContext, analyser, dataArray };