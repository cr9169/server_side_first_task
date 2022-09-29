import React, { useEffect, useState } from "react";
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
    const [peopleList, setPeopleList] = useState<IPerson[]>([]);

    const fetchData = async () => {
        setPeopleList(await PersonService.getAllPeople());
    }   

    useEffect( () => {
        fetchData();
        console.log(peopleList);
    });

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
        <div>{peopleList.length ? peopleList.map((person: IPerson, index: number) =>
            <div>
            <div>
            <div> 
                <Button id="edit-button" variant="outlined" onClick={handleClickOpen}>Edit</Button> 
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
            <Button variant="outlined" id="delete-button" onClick={() => deletePerson(index)}>delete</Button>
            <div>{person!.groups.map((group: string) => 
                <p>{group}</p>
            )};</div>
            </div>):null}        
        </div>
   </div>);
}

export default People;