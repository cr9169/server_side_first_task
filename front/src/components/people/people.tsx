import React, { useEffect, useState } from "react";
import { PersonService } from "../../services/personService";
import IPerson from "../../interfaces/personInterface";
import IGroup from "../../interfaces/groupInterface";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import "../people/people.css"

interface IProps{
    peopleList: IPerson[],
    setPeopleList: React.Dispatch<React.SetStateAction<IPerson[]>>,
    groupsList: IGroup[],
    setGroupsList: React.Dispatch<React.SetStateAction<IGroup[]>>
}

const People: React.FC<IProps> = ({peopleList, setPeopleList, groupsList, setGroupsList}) => {

    const [openCreate, setOpenCreate] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const fetchData = async () => {
        setPeopleList(await PersonService.getAllPeople());
    }   

    const breakGroupsNamesInputsAndReturnArray = (namesInput: string): string[] => {

        return namesInput.split(',').join(' ').trim().split(/\s+/);
    }

    useEffect( () => {
        fetchData();
        console.log(peopleList);
    });

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
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
            <div id="people-single-card-div">
            <div>
            <div> 
                <div>
                    <p>Person ID: &nbsp;&nbsp; {person._id}</p>
                </div>
                <Button id="edit-button" variant="outlined" onClick={handleClickOpenEdit}>Edit</Button> 
                <Dialog open={openEdit} onClose={handleCloseEdit}>
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
                    <DialogContentText>
                        Current groups related to person: {} 
                    </DialogContentText>
                    <List component="div" role="group">
                        {person.groups.map((group: string) => (
                            <ListItemText>
                                {group}
                            </ListItemText>
                        ))}
                    </List>

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleCloseEdit}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
            </div>
            <Button variant="outlined" id="delete-button" onClick={() => deletePerson(index)}>delete</Button>
            <div id="fields-div"><br/>{person!.groups.map((group: string) => 
                <p>{group}</p>
            )}</div>
            </div>):null}        
        </div>
        <Button id="create-button" variant="contained" size="large" onClick={handleClickOpenCreate}>
            Add Person
        </Button>
        <Dialog open={openCreate} onClose={handleCloseCreate}>
            <DialogTitle>Create Person</DialogTitle>
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
                label="Groups to relate the person to"
                fullWidth
                variant="standard"
            />
            <DialogContentText>
                Groups available to person: 
            </DialogContentText>
            <List component="div" role="group">
                {groupsList.map((group: IGroup) => (
                    <ListItemText>
                        {group._id}
                        {group.name}
                    </ListItemText>
                ))}
            </List>

            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handleCloseCreate}>Create</Button>
            </DialogActions>
        </Dialog>
   </div>)
}

export default People;