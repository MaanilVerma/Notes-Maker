import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "./Sidebaritem";
import { useAuth } from "../Hooks/useAuth";
import Exit from "@material-ui/icons/ExitToApp";
import AvatarGenerator from 'react-avatar-generator';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: "calc(100% - 35px)",
        position: "absolute",
        left: "0",
        width: "16rem",
        boxShadow: "0px 0px 2px black",
    },
    newChatBtn: {
        borderRadius: "0px",
    },
    unreadMessage: {
        color: "red",
        position: "absolute",
        top: "0",
        right: "5px",
    },
    newNoteBtn: {
        width: "70%",
        height: "35px",
        borderBottom: "1px solid black",
        borderRadius: "1rem",
        marginLeft:"1rem",
        backgroundColor: "#000000",
        color: "white",
        opacity: 0.9,
        "&:hover": {
            opacity: 1,
            backgroundColor: "#000000",
        },
    },
    sidebarContainer: {
        marginTop: "0px",
        width: "30%",
        height: "100%",
        boxSizing: "border-box",
        float: "left",
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor:"#f3ca20"
    },
    newNoteInput: {
        width: "95%",
        margin: ".5rem",
        height: "35px",
        outline: "none",
        border: "none",
        paddingLeft: "5px",
        "&:focus": {
            outline: "2px solid rgba(81, 203, 238, 1)",
        },
    },
    newNoteSubmitBtn: {
        width: "90%",
        backgroundColor: "#000000",
        
        color: "white",
        marginTop:".5rem",
        borderRadius: "1rem",
        marginLeft:"1rem",
        "&:hover": {
            opacity: 1,
            backgroundColor: "grey",
        },
    },
    userInfoPanel: {
        position: "fixed",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        color: "#f3ca20",
        width: "28%",
        padding: "10px",
      },
      logoutIcon: {
        cursor: "pointer",
      },
      usermaininfo:{
          display:'flex',
          color:"#000000",
          margin:".5rem",
          fontSize:"1.5rem"
          
      }
}));

const Sidebar = ({ notes, selectedNoteIndex, selectNote, deleteNote, newNote }) => {
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState("");
    const inputRef = useRef();
    const {user,signout}=useAuth();
    const classes = useStyles();

    const newNoteBtnClick = () => {
        setAddingNote((prev) => !prev);
    };
    useEffect(() => {
        if (addingNote) {
            inputRef.current.focus();
        }
    }, [addingNote]);

    const updateTitle = (title) => {
        setTitle(title);
    };
    const addNewNote = () => {
        if (title === "") {
            return;
        }
        newNote(title);
        setTitle("");
        setAddingNote(false);
    };
    // const selectNote = (n, i) => ;
    const handlelogout=()=>{
        signout();
    }
    return (
        <div className={classes.sidebarContainer}>
            <div className={classes.usermaininfo}>
            
  <p> <AvatarGenerator colors={['#FBBF24', '#4F46E5', '#EF4444']}
    backgroundColor="#F9FAFB"
    width="25"
    height="20"
    backgroundOpacity='1'
    shape="circle"
    zoom="1"
  /> {user.email}</p>
            </div>
            
            
            <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
                <AddIcon/>Newnote
                
            </Button>
            {addingNote ? (
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        className={classes.newNoteInput}
                        placeholder="Enter note title"
                        onKeyUp={(e) => updateTitle(e.target.value)}></input>
                    <Button className={classes.newNoteSubmitBtn} onClick={addNewNote}>
                        Submit Note
                    </Button>
                </div>
            ) : null}
            
            <div className={classes.noteList}>
                <List>
                    {notes &&
                        notes.map((_note, _index) => {
                            return (
                                <div key={_index}>
                                    <SidebarItem
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={selectNote}
                                        deleteNote={deleteNote}></SidebarItem>
                                    <Divider></Divider>
                                </div>
                            );
                        })}
                </List>
            </div>
            {user && (
        <div className={classes.userInfoPanel}>
          
          <Exit
            onClick={handlelogout}
            className={classes.logoutIcon}
            titleAccess={"Logout"}
          />
        </div>
      )}
        </div>
    );
};

export default Sidebar;