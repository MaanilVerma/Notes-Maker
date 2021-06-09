import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { removeHTMLTags } from "../Helpers/Helpers";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    listItem: {
        cursor: "pointer",
    },
    textSection: {
        maxWidth: "85%",
        color:"white"
    },
    deleteIcon: {
        position: "absolute",
        right: "5px",
        top: "calc(50% - 15px)",
        color:"white",
        "&:hover": {
            color: "red",
        },
    },
}));

const SidebarItem = ({ _note, _index, selectedNoteIndex, selectNote, deleteNote }) => {
    const classes = useStyles();
    
    // const handleSelectNote = (n, i) => selectNote(n, i);
    const handleDeleteNote = (n) => {
        if (window.confirm(`Are you sure you want to delete: ${n.title}`)) {
            deleteNote(n);
        }
    };
    return (
        <div key={_index}>
            <ListItem
                className={classes.listItem}
                selected={selectedNoteIndex === _index}
                alignItems="flex-start">
                <div className={classes.textSection} onClick={() => selectNote(_note, _index)}>
                    <ListItemText
                        primary={_note.title}
                        secondary={
                            removeHTMLTags(_note.body.substring(0, 30)) 
                            

                           
                        }></ListItemText>
                </div>
                <DeleteIcon
                    onClick={() => handleDeleteNote(_note)}
                    className={classes.deleteIcon}
                />
            </ListItem>
        </div>
    );
};

export default SidebarItem
