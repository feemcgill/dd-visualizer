
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const debug = true;

$(document).ready(function(){
  dbg = $('.debug');
  dbg.text('debugg');
  if (debug) {
    dbg.show();
  }
});

const ddTracks = [
  {
    'text' : 'A Place To Bury Strangers - Never Coming Back',
    'url' : 'A+Place+To+Bury+Strangers+-+Never+Coming+Back.mp3'
  },
  {
    'text' : 'All Them Witches - Alabaster',
    'url' : 'All+Them+Witches+-+Alabaster.mp3'
  },
  {
    'text' : 'CHELSEA WOLFE - Offering',
    'url' : 'CHELSEA+WOLFE+-+Offering.mp3'
  },
  {
    'text' : 'Can -  Little Star of Bethlehem',
    'url' : 'Can+-++Little+Star+of+Bethlehem.mp3'
  },
  {
    'text' : 'Connan Mockasin - It_s Choade My Dear',
    'url' : 'Connan+Mockasin+-+It_s+Choade+My+Dear.mp3'
  },
  {
    'text' : 'Cut Worms - Cash for Gold',
    'url' : 'Cut+Worms+-+Cash+for+Gold.mp3'
  },
  {
    'text' : 'DakhaBrakha - Kolyskova',
    'url' : 'DakhaBrakha+-+Kolyskova.mp3'
  },
  {
    'text' : 'Death Grips - Eh',
    'url' : 'Death+Grips+-+Eh.mp3'
  },
  {
    'text' : 'Ex-Cult - New Face On',
    'url' : 'Ex-Cult+-+New+Face+On.mp3'
  },
  {
    'text' : 'Gladys Lazer - SW Georgia',
    'url' : 'Gladys+Lazer+-+SW+Georgia.mp3'
  },
  {
    'text' : 'Here Lies Man - I stand Alone',
    'url' : 'Here+Lies+Man+-+I+stand+Alone.mp3'
  },
  {
    'text' : 'Kevin Morby - Tin Can',
    'url' : 'Kevin+Morby+-+Tin+Can.mp3'
  },
  {
    'text' : 'Kikagaku Moyo - Green Sugar',
    'url' : 'Kikagaku+Moyo+-+Green+Sugar.mp3'
  },
  {
    'text' : 'King Khan _ The Shrines - I Wanna Be a Girl',
    'url' : 'King+Khan+_+The+Shrines+-+I+Wanna+Be+a+Girl.mp3'
  },
  {
    'text' : 'Mary Lattimore - Hello From the Edge of the Earth',
    'url' : 'Mary+Lattimore+-+Hello+From+the+Edge+of+the+Earth.mp3'
  },
  {
    'text' : 'Mercury Rev - Opus 40',
    'url' : 'Mercury+Rev+-+Opus+40.mp3'
  },
  {
    'text' : 'Pond - Paint Me Silver',
    'url' : 'Pond+-+Paint+Me+Silver.mp3'
  },
  {
    'text' : 'Preoccupations - Zodiac',
    'url' : 'Preoccupations+-+Zodiac.mp3'
  },
  {
    'text' : 'Sextile - Ripped',
    'url' : 'Sextile+-+Ripped.mp3'
  },
  {
    'text' : 'Shannon _ The Clams - I Leave Again',
    'url' : 'Shannon+_+The+Clams+-+I+Leave+Again.mp3'
  },
  {
    'text' : 'The Holydrug Couple - If I Could Find You (Eternity)',
    'url' : 'The+Holydrug+Couple+-+If+I+Could+Find+You+(Eternity).mp3'
  },
  {
    'text' : 'Tropa Magica - LSD Roma',
    'url' : 'Tropa+Magica+-+LSD+Roma.mp3'
  },
  {
    'text' : 'True Widow - Skull Eyes',
    'url' : 'True+Widow+-+Skull+Eyes.mp3'
  },
  {
    'text' : 'Ty Segall -  Every 1_s a Winner',
    'url' : 'Ty+Segall+-++Every+1_s+a+Winner.mp3'
  },
  {
    'text' : 'Ulrika Spacek - Ornament',
    'url' : 'Ulrika+Spacek+-+Ornament.mp3'
  },
  {
    'text' : 'Warpaint - Above Control',
    'url' : 'Warpaint+-+Above+Control.mp3'
  },
  {
    'text' : 'White Fence - To the Boy I Jumped in the Hemlock Alley',
    'url' : 'White+Fence+-+To+the+Boy+I+Jumped+in+the+Hemlock+Alley.mp3'
  }
]


const testTracks = [
  {
    'url': '1.mp3'
  },
  {
    'url': '2.mp3'
  },
  {
    'url': '3.mp3'
  }
]

let dbg = null;



const tracks = shuffle(ddTracks);
console.log(tracks);
let trackIndex = 0;
let audioKicking = false;
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
  audioKicking = false;
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
    if (!audioKicking) {
      audioKicking = true;
      $('.loading').hide();
      $('.play-it').show();
    };
    dbg.append('<div>Next Track Loaded</div>');
    trackIndex = (trackIndex + 1) % tracks.length;  
  });

}

function updateTicker(text){
  tickerText.text =  'NOW PLAYING: ' + text;  
}

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
  updateTicker(tracks[playingIndex].text);

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

