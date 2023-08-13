import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "https://inotebook-app-mern.vercel.app"

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async() => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      }
    });
    const json = await response.json()
    console.log(json);
    setNotes(json); 

  }
  
  //Add a note
  const addNote = async(title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note))

  }

  //Delete note
  const deleteNote = async(id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      }
    });
    const json = response.json();

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();

      let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  // const s1 = {
  //     "name": "Vinay",
  //     "class": "10c"
  // }
  // const [state, setState] = useState(s1);

  // const update = ()=> {
  //     setTimeout(()=>{
  //         setState({
  //         "name" :  "kiran",
  //         "class": "12a"
  //         })
  //     }, 1000);
  // }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
