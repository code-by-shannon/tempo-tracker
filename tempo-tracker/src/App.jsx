import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('');
  const [bpm, setBpm] = useState(120);
  const [songs, setSongs] = useState([]);

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
              {song.bpm} 
              <button
              onClick={()=> deleteFunction(index) }
              >Delete</button></li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
