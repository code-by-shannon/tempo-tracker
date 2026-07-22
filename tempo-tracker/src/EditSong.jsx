import { useState } from "react";



function EditSong( {song, setEditSong, songs, setSongs} ) {

    // create a new copy of the song obj that can be edited
    const [editedSong, setEditedSong] = useState(song)

    function handleBpmChange(e) {
        setEditedSong({
        ...editedSong,
        bpm: e.target.value,
        });
    }
    
function handleUpdateSong() {
    fetch("https://codebyshannon.com/projects/tempo_tracker/tempo-api/updateSong.php", {
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
            <p>{song.title}</p>
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