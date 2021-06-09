import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        height: "calc(100% - 35px)",
        position: "absolute",
        left: "0",
        width: "300px",
        boxShadow: "0px 0px 2px black",
    },
    titleInput: {
        height: "50px",
        boxSizing: "border-box",
        border: "none",
        padding: "5px",
        fontSize: "24px",
        width: "70%",
        backgroundColor: "#000000",
        color: "White",
        paddingLeft: "50px",
    },
    editIcon: {
        position: "absolute",
        left: "31%",
        top: "12px",
        color: "white",
        width: "10",
        height: "10",
    },
    editorContainer: {
        height: "60%",
        boxSizing: "border-box",
    },
    upDate: {
        position: "absolute",
        right: "5px",
        top: "17px",
        color: "white"
      }
}));
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ["link", "image",'blockquote', 'code-block',"video"],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['emoji']
  
    ['clean']     
                                      // remove formatting button
  ];

const Editor = ({ notes, selectedNote, selectedNoteIndex, noteUpdate }) => {
    const [text, setText] = useState(selectedNote && selectedNote.body);
    const [title, setTitle] = useState(selectedNote && selectedNote.title);
    const [id, setId] = useState(selectedNote && selectedNote.id);
    const [update, setUpdate] = useState(0);
    
    const classes = useStyles();

    useEffect(() => {
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
       

    }, [selectedNote]);

    useEffect(() => {
        const timer = setTimeout(() => {
            noteUpdate(id, { title, body: text,update });
        }, 1500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [update]);

    function updateBody(val) {
        setText(val);
        setUpdate((prev) => prev + 1);
    }
    function updateTitle(val) {
        setTitle(val);
        setUpdate((prev) => prev + 1);
    }
    
    return (
        <div className={classes.editorContainer}>
            
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
           
            <input
                className={classes.titleInput}
                placeholder="Note title..."
                value={title ? title : ""}
                onChange={(e) => updateTitle(e.target.value)}></input>
            <ReactQuill theme="snow" 
            value={text} 
            onChange={updateBody} 
            modules={ {
                toolbar:toolbarOptions,
                
                
                
                
              }

               }
              
          
               
            />
        </div>
    );
};

export default Editor