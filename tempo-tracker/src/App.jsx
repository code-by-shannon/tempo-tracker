import { act } from 'react';
import { useState } from 'react'
import './App.css'

// connect new audio engine
const audioContext = new AudioContext();

function App() {
  const [title, setTitle] = useState('');
  const [bpm, setBpm] = useState(120);
  const [songs, setSongs] = useState([]);
  const [activeBPM, setActiveBPM] = useState(null);

// track song title input
  function handleSongChange(e) {
    setTitle(e.target.value);
  }

// track bpm input
  function handleBpmChange(e) {
    setBpm(e.target.value);
  }

// render song title to jsx
const songObject = {title: title, bpm: bpm};
function renderSongTitle(e){
  e.preventDefault();
  
  setSongs([...songs, songObject]);
  setTitle('');
  setBpm('');
}

// delete li (title, bpm, etc)
function deleteFunction(indexToDelete){
    const newArray = songs.filter( (song, index) => index !== indexToDelete);
    setSongs(newArray);
}

// fire function to handle clicking BPM button
function handleBpmButtonClick(bpm){
  setActiveBPM(bpm);
  
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
};

// on Test button click
function testClick(){
  click(audioContext.currentTime);
  scheduleBeats();
}

// sets beat interval parameters based on selected BPM
function scheduleBeats(){
  const secondsPerBeat = 60/activeBPM;
  let nextClickTime = audioContext.currentTime;



}

    // JSX JSX JSX JSX JSX
return (
    <>
      <h1>Perfect Tempo</h1>

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
{/* input for BPM */}
      <div className ='bpm-and-button'>
        <label htmlFor="bpm">Beats Per Minute: </label>
        <input
          onChange={ handleBpmChange }
          type="number"
          id="bpm"
          min="40"
          max="300"
          placeholder="120"
          value={bpm}
        />

        <button type="submit"
                onClick={ renderSongTitle }
        >Save Song</button>
        </div>
</form>
</div>
      <div>
        <ul className="p-song-list">
          {songs.map((song, index) => (
            <li key={index}>
              {song.title}: 
              <button
              onClick={()=> handleBpmButtonClick(song.bpm)}>{song.bpm} </button>
              <button
              onClick={()=> deleteFunction(index) }
              >Delete</button></li>
          ))}
        </ul>
      </div>

    <button
    onClick={testClick}>Test
    </button>

    </>
  )
}

export default App
