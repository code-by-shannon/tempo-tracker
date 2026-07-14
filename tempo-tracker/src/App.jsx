import { act } from 'react';
import { useState, useEffect } from 'react';
import './App.css';

// connect new audio engine
const audioContext = new AudioContext();
let nextClickTime = 0;
let isMetronomeRunning = false;

function App() {
  const [title, setTitle] = useState('');
  const [bpm, setBpm] = useState(120);
  const [songs, setSongs] = useState([]);
  const [activeBPM, setActiveBPM] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false);

// track song title input
  function handleSongChange(e) {
    setTitle(e.target.value);
  }

// track bpm input
  function handleBpmChange(e) {
    setBpm(e.target.value);
  }

// render song title to jsx and send to PHP
const songObject = {title: title, bpm: bpm};
function renderSongTitle(e){
  e.preventDefault();
  // send the song to PHP
  fetch
  ("./tempo-api/addSong.php", {
    method: "POST",
    body: JSON.stringify(songObject),
    headers: {"Content-type": "application/json"}
  })
    .then( (response) => response.text() )
    .then( (data) => console.log(data) );

  setSongs([...songs, songObject]);
  setTitle('');
  setBpm('');
}

// set list load or set list create button
function handleNotePadClick(){
  setShowListMenu(prev => !prev); 
}

// get data from tables db on initial load
// useEffect( () => {
//   local dev work
//   fetch("https://codebyshannon.com/projects/tempo_tracker/tempo-api/getSongs.php")
//   live site deployment
//   fetch("./tempo-api/getSongs.php")
//     .then( (response) => {
//       console.log("got response from db fetch for songs to render");
//       return response.json();
//     })
//     .then((data)=>{
//       setSongs(data);
//       console.log('song data on browser refresh: ', data);
//     })
//     .catch( (err)  => console.log(err));
//   }, []);

//   console.log("current songs state:", songs);

// delete li (title, bpm, etc)
function deleteFunction(idToDelete){
  console.log('deleted id:', idToDelete);
    const newArray = songs.filter( (song) => song.id !== idToDelete);
    setSongs(newArray);

  fetch("./tempo-api/deleteSong.php", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({id:idToDelete}),
  });
  
}

// handleclick BPM button
function handleBpmButtonClick(song){
  setActiveBPM(song.bpm);
  setCurrentSong(song);
  
}

// sets click parameters (tone, length etc. ) for 1 click at a scheduled time
function click(time){
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.value = 1000;

  gain.gain.setValueAtTime(1, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

  oscillator.start(time);
  oscillator.stop(time + 0.05);
  console.log(`audio context: ${time}`);

  setIsPulsing(true);

  setTimeout( ()=> {
    setIsPulsing(false)
  }, 100)
};

// on Test button click
function testClick() {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (!isMetronomeRunning) {
    isMetronomeRunning = true;
    nextClickTime = audioContext.currentTime;
    scheduler();
  } else {
    isMetronomeRunning = false;
  }
}

// sets beat interval parameters based on selected BPM
function scheduleBeats(){
  const secondsPerBeat = 60/activeBPM;
  nextClickTime += secondsPerBeat;
  click(nextClickTime);
}

// Metronome On/Off Check
function scheduler(){
  if(!isMetronomeRunning){
    setIsPlaying(false);
    return;
  } else

  if(audioContext.currentTime >= nextClickTime){
    scheduleBeats();
  }
  setTimeout(scheduler, 25);
  setIsPlaying(true);
}

// JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX
return (
    <>
      <div className="header">
        <img 
          src="imgs/drum_icon.png" alt="drum icon"
          className='drum_icon' />
        <h1>Perfect Tempo</h1>
        <img 
          onClick={ handleNotePadClick }
          src="imgs/note.png" alt="drum icon"
          className='drum_icon' />
      </div>

    { showListMenu && (
      <div className='dropdown_list'>
        <p>Black Sabbath</p>
        <p>Create New Setlist</p>
      </div>
    )}
    

      

      <div className ="form-container">
      <form>
{/* input for song title */}
        <label className='song-label' htmlFor="songTitle">Enter Song Name:</label>
        <input
          onChange={handleSongChange}
          type="text"
          id="songTitle"
          placeholder="Shining Star"
          value={title}
        />
{/* BPM input */}
      <div className ='bpm-and-button'>
        <label htmlFor="bpm" className="bpm">Beats Per Minute: </label>
        <input
          onChange={ handleBpmChange }
          type="number"
          id="bpm"
          min="40"
          max="300"
          placeholder="120"
          value={bpm}
        />
{/* Save Song Button */}
        <button 
                className='save-btn'
                type="submit"
                onClick={ renderSongTitle }
        >Save Song</button>
        </div>
</form>
</div>

<div>
  <p className='select_setlist_nag'>Please select or create a setlist using the notepad above</p>
</div>

{/* rendering song list */}
<div className='song-list-and-start-btn'>
        <ul className="p-song-list">
          {songs.map((song, index) => (
            <li key={index}>
              <span>{song.title}</span> 
              
              <button
              className='bpm-button'
              onClick={()=> handleBpmButtonClick(song)}>{song.bpm} 
              </button>
              
              <button
              onClick={()=> deleteFunction(song.id) }
              >Delete
              </button></li>
          ))}
        </ul>
      
{/* start metronome button */}
    <button
    className={ `start-button ${ isPulsing ? "pulse" : ""}` }
    
    onClick={testClick}
    
    
    >{isPlaying ? "Stop" : "Start"}
    </button>

    <p className="current_song">
      <span>Selected Song:</span>
      <span>{currentSong?.title}</span>
      <span>{currentSong?.bpm} BPM</span>
    </p>
</div>
    
    <footer>tempo tracker v1.0.0</footer>
    </>
  )
}

export default App
