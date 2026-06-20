import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [songTitle, setSongTitle] = useState([]);

// track song title input
  function handleChange(e) {
    setInput(e.target.value);
    console.log(e.target.value);
  }

// render song title to jsx
function renderSongTitle(e){
  e.preventDefault();
  setSongTitle([...songTitle, input]);
  
}

console.log(songTitle);

  return (
    <>
      <h1>Shannon and Fabián's Fabulous Tempo Tracker App</h1>

      <div className ="form-container">
      <form>
        <label className='song-label' htmlFor="songTitle">Enter Song Name:</label>
        <input
          onChange={handleChange}
          type="text"
          id="songTitle"
          placeholder="Shining Star"
        />
      <div className ='bpm-and-button'>
        <label htmlFor="bpm">Beats Per Minute: </label>
        <input
          type="number"
          id="bpm"
          min="40"
          max="300"
          placeholder="120"
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
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
