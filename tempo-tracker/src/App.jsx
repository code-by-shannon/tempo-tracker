import { act } from 'react';
import { useState, useEffect } from 'react';
import './App.css';

import EditSong from "./EditSong";
import EnterNewSong from "./EnterNewSong";
import AddSongToSetlist from './AddSongToSetList';


// toggle for local vs remote deployment
const API_URL = 
  import.meta.env.DEV
  ? "https://codebyshannon.com/projects/tempo_tracker/tempo-api/"
  : "./tempo-api/";

// connect new audio engine
const audioContext = new AudioContext();
let nextClickTime = 0;
let isMetronomeRunning = false;

function App() {
{/* use states */}
  // song building
  const [title, setTitle] = useState('');
  const [bpm, setBpm] = useState(120);
  
  //  song in the setList
  const [songs, setSongs] = useState([]);

   // state for adding new song to existing setlist
  const [addNewSongToSetlist, setAddNewSongToSetList] = useState(false);

  // state for holding currently selected setlist name
  const [currentSetListTitle, setCurrentSetListTitle] = useState('');

  // state for holding the new song object
  const [newSong, setNewSong] = useState({
    title: '',
    bpm: '',
    setlist: currentSetListTitle
  });

  // metronome functionality
  const [activeBPM, setActiveBPM] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPulsing, setIsPulsing] = useState(false);
  
  // display/hide setList dropdown
  const [showListMenu, setShowListMenu] = useState(false);
  
  // store setList from db
  const [setList, setSetList] = useState('');
  // EditSong.jsx (for rendering editing screen)
  const [editingSong, setEditingSong] = useState(null);
  // Form for entering new songs into new setlist state
  const [isEnteringNewSongs, setIsEnteringNewSongs] = useState(false);
  // new setlist input tracker
  const [newSetListName, setNewSetListName] = useState("");

// handle the click on the li item that opens the form to create a new setlist
const handleCreateNewSetlist = () => {
  setIsEnteringNewSongs(true);

  // why are all songs green?
};

// track song title input
  function handleSongChange(e) {
    setTitle(e.target.value);
  }

// track bpm input
  function handleBpmChange(e) {
    setBpm(e.target.value);
  }

// track new setlist name input
  function handleSetListNameChange(e){
    setNewSetListName(e.target.value);
  }

// render song title to jsx and send to PHP
const songObject = {title: title, bpm: bpm, setlist: newSetListName};
// sends new song to PHP to insert into db
// updates local songs array so UI changes
function renderSongTitle(e){
  e.preventDefault();
  // send the song to PHP
  fetch(`${API_URL}addSong.php`, {
    method: "POST",
    body: JSON.stringify(songObject),
    headers: {"Content-type": "application/json"}
  })
  // after php has recieved songObject return object from php with ID added 
    .then( (response) => response.json() )
    .then((data) => {
      console.log('object from php: ', data);
      setSongs([...songs, data]);
    });
    // .then( (data) => console.log(data) );

  console.log('This is the song object: ', songObject);
  setTitle('');
  setBpm(120);
}

// render stored setlists and create new setlist
function handleNotePadClick(){
  // showListMenu is true or false
  // prev => toggles state
  setShowListMenu(prev => !prev); 
}

// get setLists from db
useEffect( () => {

  fetch(`${API_URL}getSetLists.php`)
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


  function handleUniqueSetList(obj){
    // store setlist name in state
    setCurrentSetListTitle(obj.setlist);

    // send request to php
    fetch(`${API_URL}getUniqueSetList.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
  
    // retrieval of data from php 
    .then((response) => response.json())
    .then((data) => {
    // console.log('this is the data:', data);
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
  fetch(`${API_URL}deleteSong.php`,

  
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
  // console.log('song in handlebpm function: ', song)
  setActiveBPM(song.bpm);
  setCurrentSong(song);
  // console.log('this is the currentSong: ', currentSong);
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
            setSongs={setSongs}
            cancelEdit={cancelEdit}
            setEditingSong={setEditingSong} />;
}

{/* Cancel Song Editing and return to SetList*/}
function cancelEdit(){
  setEditingSong(null);
}

console.log("This is the setList: ", setList)
// console.log('songs array: ', songs);
// console.log('editedSong: ', editingSong);

// JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX JSX
return (
    <>
{/* click in navbar area to render saved setlists and/or create new setlist*/}    
      <div className="header"
           onClick={ handleNotePadClick }>
          
          {/* drum icon */}
          <img 
          src="imgs/drum_icon.png" alt="drum icon"
          className='drum_icon' />
          
          {/* App name and directions div */}
          <div className="nav_click">
          <h1>Perfect Tempo</h1>
          <p>🎵 Click here to start 🎵</p>
          </div>
        
          {/* Notepad icon img */}
          <img 
          src="imgs/note.png" alt="drum icon"
          className='drum_icon' />
      </div>

{/* Form to ADD a new song to existing setlist */}
{ addNewSongToSetlist && 
  <AddSongToSetlist 
    setListTitle={currentSetListTitle}
    newSong={newSong}
    setNewSong={setNewSong}
    setSongs={setSongs}
  /> }

{/* Dropdown rendering of setlist names */}
    { showListMenu && (
      <div className='dropdown_list'>
        <ul className='setList_render'>
          {/* setList on initial render contains all titles in db */}
          {setList.map((setlistRender)=>(
            <li key={ setlistRender.setlist }
                onClick={ () => handleUniqueSetList(setlistRender) }>
              {setlistRender.setlist}
            </li>
          ))}
      
{/* Create a new setlist from scratch*/}          
          <li
          className="create_new_setlist_li"
          onClick={handleCreateNewSetlist}
          >
  Create New Setlist
</li>
        </ul>
        
      </div>
    )}

{isEnteringNewSongs && (
  <EnterNewSong 
  // display or don't display the song entering form
  setIsEnteringNewSongs={setIsEnteringNewSongs}
  // state that holds the typing into new setlist name
  newSetListName={newSetListName}
  handleSetListNameChange={handleSetListNameChange}
  title={title}
  handleSongChange={handleSongChange}
  handleBpmChange={handleBpmChange}
  renderSongTitle={renderSongTitle}
/>
)}    

{/* jsx for rendering list of songs from setlist and START button*/}
<div className="song-list-and-start-btn">
  {/* button to add new song to existing set list */}
  <button
  onClick={()=>{setAddNewSongToSetList(true)}}
  >+ Add New Song</button>
  <h2>Current Set List: {currentSetListTitle}</h2>
  
  {/* Table for setlist render title, bpm, edit */}
  <table className="song-table">
  
    {/* table head */}
    <thead>
      <tr>
        <th>Title</th>
        <th>BPM</th>
        <th>Edit</th>
      </tr>
    </thead>
    
    {/* table body */}
    <tbody>
  {songs.map((song) => (
    <tr key={song.id}>
      {/* song title */}
      <td
        className={currentSong?.id === song.id ? "active-song" : ""}
        onClick={() => handleBpmButtonClick(song)}
      >
        {song.title}
      </td>

      {/* bpm button */}
      <td>
        <button
          className="bpm-button"
          onClick={() => handleBpmButtonClick(song)}
        >
          {song.bpm}
        </button>
      </td>

      {/* edit button */}
      <td>
        <button
          onClick={() => {
            handleEditSong(song);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
  
  {/* start button */}              
  <button
    className={ `start-button ${ isPulsing ? "pulse" : ""}` }
    onClick={testClick}
  >{isPlaying ? "Stop" : "Start"}</button>
</div>

{/* footer */}    
<footer>tempo tracker v1.1.0</footer>
</>
)}

export default App
