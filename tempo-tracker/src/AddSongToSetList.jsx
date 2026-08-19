import { useState } from "react";

// toggle for local vs remote deployment
const API_URL = import.meta.env.DEV
  ? "https://codebyshannon.com/projects/tempo_tracker/tempo-api/"
  : "./tempo-api/";


  function AddSongToSetlist() {
    return (
      <>
        <h1>Add New Song To Existing Setlist</h1>
      </>
    );
  }
  
  export default AddSongToSetlist;




// {/* <div> */}
//       {/* Render Current Setlist Name */}
// {/* //       <div className="field"> */}
// {/* //         <label htmlFor="title">Edit Song Title</label> */}
//         <input
//           id="title"
//           type="text"
//           value={editedSong.title}
//           onChange={handleTitleChange}
//         />
//       </div>

//       {/* BPM edit */}
//       <div className="field">
//         <label htmlFor="bpm_edit">Edit BPM</label>
//         <input
//           id="bpm_edit"
//           type="number"
//           value={editedSong.bpm}
//           onChange={handleBpmChange}
//         />
//       </div>

//       {/* Update Button*/}
//       <button id="edit_update_btn" onClick={handleUpdateSong}>
//         UPDATE
//       </button>
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
