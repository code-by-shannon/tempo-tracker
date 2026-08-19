import { useState } from "react";

// toggle for local vs remote deployment
const API_URL = import.meta.env.DEV
  ? "https://codebyshannon.com/projects/tempo_tracker/tempo-api/"
  : "./tempo-api/";

function AddSongToSetlist({ setListTitle, newSong, setNewSong, setSongs }) {
  function handleNewSong() {
    // send newSong object to addSong.php
    // addSong.php should send back songObject

    // send the song to PHP
    fetch(`${API_URL}addSong.php`, {
      method: "POST",
      // spread in newSong while updating setlist
      body: JSON.stringify({ ...newSong, setlist: setListTitle }),
      headers: { "Content-type": "application/json" },
    })
      .then(() => {
        return fetch(`${API_URL}getUniqueSetList.php`,{
            method: 'POST',
            body: JSON.stringify({setlist: setListTitle}),
            headers: {'Content-type': 'application/json'}
        });
      })
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      });
  }
  return (
    <>
      <div>
        <h1>Add New Song To Existing Setlist</h1>
        <p>you are adding a song to the {setListTitle} setlist</p>
        {/* input for song title */}
        <div className="field">
          <label htmlFor="title">Enter Song Title</label>
          <input
            id="title"
            type="text"
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
          />
        </div>

        {/* input for BPM */}
        <div className="field">
          <label htmlFor="bpm">Enter BPM</label>
          <input
            id="bpm"
            type="number"
            onChange={(e) => setNewSong({ ...newSong, bpm: e.target.value })}
          />
        </div>

        {/* Send New Song To DB and render*/}
        <button id="submit_new_song_btn" onClick={handleNewSong}>
          Enter New Song
        </button>
      </div>
    </>
  );
}

export default AddSongToSetlist;

//       {/* Cancel Button */}
//       <button id="cancel_edit_btn" onClick={cancelEdit}>
//         CANCEL EDIT
//       </button>
//       {/* DELETE SONG */}
//       <button id="delete_song_btn" onClick={deleteSong}>
//         DELETE SONG
//       </button>
//     </div>
//   </>
// );
