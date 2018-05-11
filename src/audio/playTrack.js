import appState from './../state.js';
import {swapTextures, snakeIntro, updateTicker} from './../visual';
import {audioContext, analyser} from './audioInit';
import {dbg,debug} from './../debug.js';
import nextTrack from './nextTrack';

let trackSource;
let playCount = 0;

const playTrack = function(track) {
  if (appState.audioInitiated) {
    trackSource.buffer = null;
    swapTextures();
  } else {
    snakeIntro();    
  }
  trackSource = audioContext.createBufferSource();
  trackSource.buffer = track.buffer;
  trackSource.connect(analyser);
  trackSource.onended = function(event) {
    playTrack(appState.nextTrack);
  }

  trackSource.start();
  dbg.append('<div>Playing New Track</div>');
  appState.audioInitiated = true;


  if (appState.currentTrack != appState.nextTrack) {
    updateTicker(track.text);
    playCount++;
    nextTrack();
  }

  appState.currentTrack = track;

}

export {trackSource, playTrack};
