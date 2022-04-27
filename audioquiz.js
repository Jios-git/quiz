var audio = new Audio();
audio.loop = true;
audio.volume = 0.2;
var btn = document.getElementById("audio-btn");
var firstToggle = true;
var buttonPress = false;
var visualCount = 0;
var audioCount = 1;

//function will be called every time the play/pause button is pressed
function togglePlay() {
  
  if (buttonPress == true) {
    audioCount++;
  }

  if (audio.paused && !btn.classList.contains("pause") && firstToggle == true) {
    audio.src = `audio/${audioCount}.mp3`;
    loadPlayer();
    btn.classList.toggle("pause");
    audio.play();
    firstToggle = false;
  } else if (buttonPress == true) {
    buttonPress = false;
    audio.src = `audio/${audioCount}.mp3`;

    if (audio.paused && btn.classList.contains("pause")) {
      btn.classList.toggle("pause");
      audio.pause();
    }

    loadPlayer();

  } else if (audio.paused && !btn.classList.contains("pause")) {
    audio.play();
    btn.classList.toggle("pause");
  } else {
    audio.pause();
    btn.classList.toggle("pause");
  }
}

//establishing all variables that analyser will use
var canvas = [], ctx = [], source = [], context = [], analyser = [], fbc_array, bars, bar_x, bar_width, bar_height;

//audio analyser adapted from http://www.developphp.com/video/JavaScript/Analyser-Bars-Animation-HTML-Audio-API-Tutorial

//each time this function is called I needed to make an array to have new
//variables because .createMediaElementSource() can not create a new source
//if the variable already had one created
function loadPlayer() {
  context[visualCount] = new AudioContext();
  document.getElementById('audio_container').appendChild(audio);
  analyser[visualCount] = context[visualCount].createAnalyser();
  canvas[visualCount] = document.getElementById('analyser-render');
  ctx[visualCount] = canvas[visualCount].getContext('2d');
  

  source[visualCount] = context[visualCount].createMediaElementSource(audio);
  source[visualCount].connect(analyser[visualCount]);
  analyser[visualCount].connect(context[visualCount].destination);
  visualCount++;
  frames();

}

//frames() creates a frame relating to the audio frequency, this is looped at the
//default frame rate provided by the browser
function frames() {
  window.requestAnimationFrame(frames);
  fbc_array = new Uint8Array(1024);
  analyser[visualCount - 1].getByteFrequencyData(fbc_array);
  ctx[visualCount - 1].clearRect(0, 0, canvas[visualCount - 1].width, canvas[visualCount - 1].height); // Clear the canvas
  ctx[visualCount - 1].fillStyle = '#fff'; // Color of the bars
  bars = 60;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 5;
    bar_width = 3;
    bar_height = -(fbc_array[i] / 2);
    ctx[visualCount - 1].fillRect(bar_x, canvas[visualCount - 1].height, bar_width, bar_height);
  }
}
