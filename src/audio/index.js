import ddTracks from './playlist';
import shuffle from './../util/shuffleArray';
import {swapTextures, snakeIntro} from './../visual';
import appState from './../state.js';


const debug = false;

$(document).ready(function(){
  dbg = $('.debug');
  dbg.text('debugg');
  if (debug) {
    dbg.show();
  }
});

let dbg = null;

const tracks = shuffle(ddTracks);

let trackIndex = 0;
let autioInitiated = false;
let playCount = 0;
let audioContext = null;
let usingWebAudio = true;
let analyser = null;
let bufferLength = null;
let dataArray = null;
let viZdata;
let trackBuffer;
let trackSource;

function nextTrack(){
  const audioSrc = '//s3-us-west-2.amazonaws.com/ddaze-visualizer/dd18mix/'+tracks[trackIndex].url;

  window.fetch(audioSrc)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer, 
    audioBuffer => {
      trackBuffer = audioBuffer;
    }, 
    error => 
      console.error(error)
    )
  )
  .catch((exception) => {
    console.error('oh noes!', exception)
    dbg.append('<div>EXCEPTION</div>');
    dbg.append(exception);
  })    
  .then(function(){
    if (!appState.audioKicking) {
      appState.audioKicking = true;
      $('.loading').hide();
      $('.play-it').show();
    };
    dbg.append('<div>Next Track Loaded</div>');
    trackIndex = (trackIndex + 1) % tracks.length;  
  });

}

// function updateTicker(text){
//   tickerText.text =  'NOW PLAYING: ' + text;  
// }

let playingIndex = 0
function play(audioBuffer) {
  if (autioInitiated) {
    trackSource.buffer = null;
  }
  trackSource = audioContext.createBufferSource();
  trackSource.buffer = audioBuffer;
  trackSource.connect(analyser);
  trackSource.onended = function(event) {
    // Play the next track once this one has ended.. Assumes trackBuffer has been updated to the next track via nextTrack();
    // TODO: test to see if the next track is indeed ready to play.
    play(trackBuffer);
  }    
  trackSource.start();
  dbg.append('<div>Playing New Track</div>');
  autioInitiated = true;
  
  // Visual stuff
  if (playCount > 0) {
    swapTextures();
  } else {
    snakeIntro();    
  }
  //updateTicker(tracks[playingIndex].text);

  playingIndex = (playingIndex + 1) % tracks.length;  
  playCount++;
  nextTrack();
}



function initAudio(callback){
  try {
    if (typeof AudioContext !== 'undefined') {
        audioContext = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
        audioContext = new webkitAudioContext();
    } else {
        usingWebAudio = false;
    }
  } catch(e) {
      usingWebAudio = false;
  }
  analyser = audioContext.createAnalyser();
  analyser.connect(audioContext.destination);
  analyser.fftSize = 32;
  bufferLength = analyser.frequencyBinCount; 
  dataArray = new Uint8Array(bufferLength);
  callback();
}

initAudio(nextTrack);



let muted = false;
$('.play-it').click(function(e){
  if (usingWebAudio && audioContext.state === 'suspended') {
    audioContext.resume();
  }  
  e.preventDefault();
  play(trackBuffer);
  if (!debug) {
    dbg.append(usingWebAudio, audioContext.state);
    $('.loading-screen').remove();    
  }
});

$('.mute-toggle').click(function(){
  if (muted) {
    trackSource.connect(analyser);
    $(this).text('mute');
  } else {
    trackSource.disconnect();
    $(this).text('unmute');
  }
  muted = !muted;
});


export {analyser, dataArray};