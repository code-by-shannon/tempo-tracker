import { useState } from "react";

// toggle for local vs remote deployment
const API_URL = import.meta.env.DEV
  ? "https://codebyshannon.com/projects/tempo_tracker/tempo-api/"
  : "./tempo-api/";

function EditSong({
  song,
  setEditSong,
  songs,
  setSongs,
  cancelEdit,
  setEditingSong,
}) {
  // create a new copy of the song obj that can be edited
  const [editedSong, setEditedSong] = useState(song);

  function handleBpmChange(e) {
    setEditedSong({
      ...editedSong,
      bpm: e.target.value,
    });
  }

  function handleTitleChange(e) {
    setEditedSong({
      ...editedSong,
      title: e.target.value,
    });
  }

  function deleteSong() {
    // console.log("editedSong: ", editedSong);
    // send data to deleteSong.php
    fetch(`${API_URL}deleteSong.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedSong),
    }).then(() => {
      // return to homescreen
      setEditingSong(null);
      // filter to create updated songs array after delete
      const filteredSongs = songs.filter((song)=>{
          return song.id !== editedSong.id;
      });  console.log('song: ', songs, 'filteredSongs', filteredSongs);
      setSongs(filteredSongs);
    })
    // return to home screen
  }

  // after update button click, update db and exit edit screen
  function handleUpdateSong() {
    // console.log('this is the songs log inside of handleUpdateSong: ', songs);

    // send data to updateSong.php
    fetch(`${API_URL}updateSong.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedSong),
    })
      // retrieve data from updateSong.php
      .then(() => {
        setSongs(
          // if id's match return edited song object
          songs.map((song) => {
            if (song.id === editedSong.id) {
              return editedSong;
            }
            // else return original object
            return song;
          })
        );
        setEditSong(null);
      });
  }

  {
    
    /* JSX */
  }
  return (
    <>
      <h1>Edit Screen</h1>
      <div className="edit_page_div">
        {/* Title Edit */}
        <div className="field">
          <label htmlFor="title">Edit Song Title</label>
          <input
            id="title"
            type="text"
            value={editedSong.title}
            onChange={handleTitleChange}
          />
        </div>

        {/* BPM edit */}
        <div className="field">
          <label htmlFor="bpm_edit">Edit BPM</label>
          <input
            id="bpm_edit"
            type="number"
            value={editedSong.bpm}
            onChange={handleBpmChange}
          />
        </div>

        {/* Update Button*/}
        <button id="edit_update_btn" onClick={handleUpdateSong}>
          UPDATE
        </button>
        {/* Cancel Button */}
        <button id="cancel_edit_btn" onClick={cancelEdit}>
          CANCEL EDIT
        </button>
        {/* DELETE SONG */}
        <button id="delete_song_btn" onClick={deleteSong}>
          DELETE SONG
        </button>
      </div>
    </>
  );
}

export default EditSong;
