import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [songName, setSongName] = useState('');


  function handleChange(e) {
    setSongName(e.target.value);
    console.log(e.target.value);
  }
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

        <button type="submit">Save Song</button>
        </div>
</form>
</div>

        <div>
          <p className = 'p-song-list'> { songName }</p>
        </div>

    </>
  )
}

export default App
