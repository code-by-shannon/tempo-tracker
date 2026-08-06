import { useState } from "react";

// toggle for local vs remote deployment
const API_URL = 
  import.meta.env.DEV
  ? "https://codebyshannon.com/projects/tempo_tracker/tempo-api/"
  : "./tempo-api/";



function EditSong( {song, setEditSong, songs, setSongs, cancelEdit} ) {

// create a new copy of the song obj that can be edited
    const [editedSong, setEditedSong] = useState(song)

    function handleBpmChange(e) {
        setEditedSong({
        ...editedSong,
        bpm: e.target.value,
        });
    }

    function handleTitleChange(e){
        setEditedSong({
        ...editedSong,
        title: e.target.value,
        })
    }
    
function handleUpdateSong() {
    
    fetch(`${API_URL}updateSong.php`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedSong),
    })
    .then(() => {

        setSongs(
            songs.map((song) => {
                if (song.id === editedSong.id) {
                    return editedSong;
                }
    
                return song;
            })
        );
    
        setEditSong(null);
    });
}

{/* return statement return statement */}        
    return (
        <>
        <h1>Edit Screen</h1>
        <div className='edit_page_div'>
            {/* Title Edit */}
            <div className="field">
                <label htmlFor="title">Edit Song Title</label>
                <input 
                id="title"
                type="text"
                value = {editedSong.title}
                onChange={handleTitleChange} />
            </div>
            
            
            {/* BPM edit */}
            <div className="field">
                <label htmlFor="bpm_edit">Edit BPM</label>
                <input 
                        id="bpm_edit"
                        type="number"
                        value={editedSong.bpm}
                        onChange={handleBpmChange} />
            </div>
            
            {/* Update Button*/}
            <button
            id="edit_update_btn"
            onClick={handleUpdateSong}
            >UPDATE</button>
            {/* Cancel Button */}
            <button
            id="cancel_edit_btn"
            onClick={cancelEdit}
            >CANCEL</button>
        </div>
        </>
        );
    }


  
export default EditSong;