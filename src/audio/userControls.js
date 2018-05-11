import appState from './../state.js';
import {audioContext, analyser} from './audioInit';
import {trackSource, playTrack} from './playTrack.js';
import {debug} from './../debug.js';

export default function(){
  let muted = false;
  $('.play-it').click(function(e){
    if (appState.usingWebAudio && audioContext.state === 'suspended') {
      audioContext.resume();
    }  
    e.preventDefault();
    playTrack(appState.nextTrack);
    if (!debug) {
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
}