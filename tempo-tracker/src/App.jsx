import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [bpm, setBpm] = useState(120);
  const [songTitle, setSongTitle] = useState([]);

// track song title input
  function handleSongChange(e) {
    setInput(e.target.value);
  }

// track bpm input
  function handleBpmChange(e) {
    setBpm(e.target.value);
  }

// render song title to jsx
const songObject = {title: input, bpm: bpm};
function renderSongTitle(e){
  e.preventDefault();
  

  setSongTitle([...songTitle, songObject]);
  setInput('');
  setBpm('');
}



  return (
    <>
      <h1>Shannon and Fabián's Fabulous Tempo Tracker App</h1>

      <div className ="form-container">
      <form>
        <label className='song-label' htmlFor="songTitle">Enter Song Name:</label>
        <input
          onChange={handleSongChange}
          type="text"
          id="songTitle"
          placeholder="Shining Star"
          value={input}
        />
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
          {songTitle.map((song, index) => (
            <li key={index}>{song.title}: {song.bpm}</li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
