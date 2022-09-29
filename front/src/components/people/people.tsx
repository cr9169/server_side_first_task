import React, { useState } from "react";
import { PersonService } from "../../services/personService";
import IPerson from "../../interfaces/personInterface";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./people.css";

interface IProps{

}

const People: React.FC<IProps> = ({}) => {

    const [open, setOpen] = React.useState(false);
    const [peopleList, setPeopleList] = useState<IPerson[]>();
    PersonService.getAllPeople().then((people):void => { setPeopleList(people) });

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const deletePerson = (index: number): void => {
        const newPeopleList = peopleList;
        const personToDeleteID: string = newPeopleList![index]._id; // how to get id by object (person)
        newPeopleList?.splice(index, 1);
        setPeopleList([...newPeopleList!]);
        PersonService.deletePersonByID(personToDeleteID);
    }
    
    //add DB functionality to submition
    return (<div id="people">
        <div>{peopleList!.map((person: IPerson, index: number) =>
            <div>
            <div>
            <div> 
                <Button variant="outlined" onClick={handleClickOpen}>Edit</Button> 
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Person</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Age"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Groups to remove from list"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
            </div>
            <button onClick={() => deletePerson(index)}>delete</button>
            <div>{person!.groups.map((group: string) => 
                <p>{group}</p>
            )};</div>
            </div>)}        
        </div>
   </div>);
}

export default People;