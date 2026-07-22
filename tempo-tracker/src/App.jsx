import { act } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import EditSong from "./EditSong";

// connect new audio engine
const audioContext = new AudioContext();
let nextClickTime = 0;
let isMetronomeRunning = false;

function App() {
{/* use states */}
  const [title, setTitle] = useState('');
  const [bpm, setBpm] = useState(120);
  
  //  const to hold current selected setlist
  const [songs, setSongs] = useState([]);
  
  const [activeBPM, setActiveBPM] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPulsing, setIsPulsing] = useState(false);
  // display/hide the dropdown 
  const [showListMenu, setShowListMenu] = useState(false);
  // store setList from db
  const [setList, setSetList] = useState('');
  // EditSong.jsx (for rendering editing screen)
  const [editingSong, setEditingSong] = useState(null);
 

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
// sends new song to PHP to insert into db
// updates local songs array so UI changes
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
    // .then( (data) => console.log(data) );

  setSongs([...songs, songObject]);
  setTitle('');
  setBpm('');
}

// SetList names load and Create New Setlist button
function handleNotePadClick(){
  setShowListMenu(prev => !prev); 
}
// retrieve setList from db and render
// function fetchSetList(setList){
//   console.log(setList);
// }

// get setLists from db
useEffect( () => {
//   local dev work
  fetch("https://codebyshannon.com/projects/tempo_tracker/tempo-api/getSetLists.php")
//   live site deployment
//   fetch("./tempo-api/getSongs.php")
    .then( (response) => {
      // console.log("setLists queried ✅");
      return response.json();
    })
    .then((data)=>{
      setSetList(data);
      // console.log('setList data on browser refresh: ', data);
    })
    .catch( (err)  => console.log(err));
  }, []);

// Dropdown unique setlist fetch
function handleUniqueSetList(obj){
  console.log('clicked');
  // value to send for db query
  const setListName = obj.setlist;
  console.log(setListName);
  fetch("https://codebyshannon.com/projects/tempo_tracker/tempo-api/getUniqueSetList.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    setlist: setListName,
  }),
})
.then((response) => response.json())
.then((data) => {
  console.log(data);
  setSongs(data);
});
}

// delete li (title, bpm, etc)
function deleteFunction(idToDelete)
{
  // console.log('deleted id:', idToDelete);
    const newArray = songs.filter( (song) => song.id !== idToDelete);
    setSongs(newArray);

  // live deploy fetch  
  // fetch("./tempo-api/deleteSong.php",
  // local fetch
  fetch("https://codebyshannon.com/projects/tempo_tracker/tempo-api/deleteSong.php",
  
  {
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
  // console.log(`audio context: ${time}`);

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



{/* handle edit button click and pass value to state */}
function handleEditSong(song){
  setEditingSong(song);
}

{/* Editing Song Render */}
if (editingSong) {
  return <EditSong 
            song={editingSong}
            setEditSong={setEditingSong}
            songs={songs}
            setSongs={setSongs} />;
}
// JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX
return (
    <>
{/* NotePad click handle for dropdown*/}    
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

{/* Set List Dropdown Names and Render */}
    { showListMenu && (
      <div className='dropdown_list'>
        <ul className='setList_render'>
          {setList.map((setlistRender, index)=>(
            <li key={index }
                onClick={ () => handleUniqueSetList(setlistRender) }>
              <span>{setlistRender.setlist}</span>
            </li>
          ))}
          <li>Create New Setlist</li>
        </ul>
        
      </div>
    )}
    
{/* Form Container */}
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

{/* Select SetList Nag */}
<div>
  <p className='select_setlist_nag'>Please select or create a setlist using the notepad above</p>
</div>

{/* rendering song list */}
{/* rendering song list */}
<div className="song-list-and-start-btn">

  <h2>Current Set List</h2>

  <table className="song-table">

    <thead>
      <tr>
        <th>Title</th>
        <th>BPM</th>
        <th>Edit</th>
      </tr>
    </thead>

    <tbody>
      {songs.map((song) => (
        <tr key={song.id}>

          <td>{song.title}</td>

          <td>
            <button
              className="bpm-button"
              onClick={() => handleBpmButtonClick(song)}
            >
              {song.bpm}
            </button>
          </td>

          <td>
            <button
              onClick={() => handleEditSong(song)}
            >
              Edit
            </button>
          </td>

        </tr>
      ))}
    </tbody>

  </table>

</div>
    
    <footer>tempo tracker v1.0.0</footer>
    </>
  )
}

export default App
