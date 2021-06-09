import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import { useAuth } from "../Hooks/useAuth";
import { Redirect } from "react-router-dom";
import { removeHTMLTags } from "../Helpers/Helpers";
import { useCallback } from "react";



const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [newNoteId, setNewNoteId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      projectFirestore
        .collection("notes")
        .orderBy("title", "desc")
        .where("author", "==", user.email)
        .onSnapshot((serverUpdate) => {
          const notes = serverUpdate.docs.map((_doc) => {
            const data = _doc.data();
            data["id"] = _doc.id;
            return data;
          });
          setNotes(notes);
          console.log(notes)
          setNewNoteId(null);
        });
    }
  }, [user]);

  const searchNotes = useCallback(
    (query) => {
      if (query) {
        const searchQuery = query.toLowerCase();
        const searchResults = notes.filter((note) => {
          if (
            note.title?.toLowerCase().includes(searchQuery) ||
            removeHTMLTags(note.body)?.toLowerCase().includes(searchQuery)
          ) {
            return true;
          }
          return false;
        });
        return searchResults;
      } else return [];
    },
    [notes]
  );

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
  };

  const newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };
   
    const newFromDB = await projectFirestore.collection("notes").add({
      title,
      body: note.body,
      author: user.email,
    });
    const newId = newFromDB.id;
    setNotes([...notes, note]);
    setNewNoteId(newId);
  };

  useEffect(() => {
    if (newNoteId) {
      const newNoteIndex = notes.findIndex((_note) => _note.id === newNoteId);
      
      selectNote(notes[newNoteIndex], newNoteIndex);
    }
  }, [newNoteId, notes]);

  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note);
    setNotes(notes.filter((_note) => _note.id !== note.id));
    if (selectedNoteIndex === noteIndex) {
      selectNote(null, null);
    } else if (selectedNoteIndex > noteIndex) {
      setSelectedNote(notes[selectedNoteIndex]);
      setSelectedNoteIndex(selectedNoteIndex - 1);
    }

    await projectFirestore.collection("notes").doc(note.id).delete();
  };

  const noteUpdate = async (id, note) => {
    if (id && note) {
      await projectFirestore.collection("notes").doc(id).update({
        title: note.title,
        body: note.body,
        author: user.email,
      });
    }
  };

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="app-container">
      <Sidebar
        selectedNoteIndex={selectedNoteIndex}
        setSelectedNoteIndex={setSelectedNoteIndex}
        notes={notes}
        setNotes={setNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        selectNote={selectNote}
        newNote={newNote}
        deleteNote={deleteNote}
        searchNotes={searchNotes}
      />
     
      {selectedNote ? (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        />
      ) : (
        null
      )
}
</div>
  );
};

export default Dashboard;
