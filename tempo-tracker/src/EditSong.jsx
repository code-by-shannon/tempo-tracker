import { useState } from "react";

// toggle for local vs remote deployment
const API_URL = 
  import.meta.env.DEV
  ? "https://codebyshannon.com/projects/tempo_tracker/tempo-api/"
  : "./tempo-api/";



function EditSong( {song, setEditSong, songs, setSongs} ) {

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
        <div>
            {/* Title Edit */}
            <input 
            type="text"
            value = {editedSong.title}
            onChange={handleTitleChange} />
            {/* BPM edit */}
            <input type="number"
                    value={editedSong.bpm}
                    onChange={handleBpmChange} />
            <button
            onClick={handleUpdateSong}
            >UPDATE</button>
        </div>
        );
    }


  
export default EditSong;