function EnterNewSong({title, bpm, handleSongChange, renderSongTitle, handleBpmChange, setIsEnteringNewSongs, newSetListName, handleSetListNameChange}) {
    return (
      <>

{/* Form Container */}
<div className ="form-container">
<form>
{/* input for creating new setlist name */}
  <label htmlFor="newSetListName">Enter New Setlist Name:</label>
  <input type="text"
  id="newSetListName"
  placeholder="Friday Night Setlist" 
  value={newSetListName}
  onChange={handleSetListNameChange}
  />

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
{/* Cancel Button */}
  <button
          className='save-btn'
          type='button'
          onClick={()=>setIsEnteringNewSongs(false)}
  >Cancel</button>
  </div>
</form>
</div>
      
      
      </>
    );
  }


  
  export default EnterNewSong;

