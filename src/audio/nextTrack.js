import appState from './../state.js';
import {audioContext} from './audioInit';
import ddTracks from './playlist';
import {dbg,debug} from './../debug.js';
import shuffle from './../util/shuffleArray';

let trackIndex = 0;
const tracks = shuffle(ddTracks);

const nextTrack = function(){
  const audioSrc = '//s3-us-west-2.amazonaws.com/ddaze-visualizer/dd18mix/'+tracks[trackIndex].url;

  window.fetch(audioSrc)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer, 
    audioBuffer => {
      tracks[trackIndex].buffer = audioBuffer;
      appState.nextTrack = tracks[trackIndex];
    }, 
    error => 
      console.error(error)
    )
  )
  .catch((exception) => {
    console.error('Fetch exception: ', exception)
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

export default nextTrack;