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
import "./people.css";
import { GroupService } from "../../services/groupService";

interface IProps{
    peopleList: IPerson[],
    setPeopleList: React.Dispatch<React.SetStateAction<IPerson[]>>,
    groupsList: IGroup[],
    setGroupsList: React.Dispatch<React.SetStateAction<IGroup[]>>
}

const People: React.FC<IProps> = ({peopleList, setPeopleList, groupsList, setGroupsList}) => {

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    // create: 
    const [firstNameCreationValue, setFirstNameCreationValue] = useState<string>("");
    const [lastNameCreationValue, setLastNameCreationValue] = useState<string>("");
    const [ageCreationValue, setAgeCreationValue] = useState<string>("");
    const [groupsToRelateCreationValue, setGroupsToRelateCreationValue] = useState<string>("");

    // update:
    const [firstNameUpdateValue, setFirstNameUpdateValue] = useState<string>("");
    const [lastNameUpdateValue, setLastNameUpdateValue] = useState<string>("");
    const [ageUpdateValue, setAgeUpdateValue] = useState<string>("");
    const [groupsToRelateUpdateValue, setGroupsToRelateUpdateValue] = useState<string>(""); 

    const isNumber = (value: string | number): boolean => {
       
        return ((value != null) &&
               (value !== '') &&
               !isNaN(Number(value.toString())));
    }

    const breakGroupsNamesInputsAndReturnArray = (namesInput: string): string[] => {

        return namesInput.split(',').join(' ').trim().split(/\s+/);
    }

    const doesArrayContainsOtherArray = (firstArray: string[], secondArray: string[]): boolean => {
        return secondArray.every(group => firstArray.includes(group));
    }

    const fetchData = async () => {
        setGroupsList(await GroupService.getAllGroups());
        setPeopleList(await PersonService.getAllPeople());
    }  

    useEffect( () => {
        fetchData();
    },[]);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleClickOpenEdit = (id: string) => {
        setOpenEdit(true);
        // setcurrentPersonID(id);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const deletePerson = (index: number): void => {
        const newPeopleList = peopleList;
        const personToDeleteID: string = newPeopleList![index]._id!; // how to get id by object (person)
        newPeopleList?.splice(index, 1);
        setPeopleList([...newPeopleList!]);
        PersonService.deletePersonByID(personToDeleteID);
    }

    const handeClickCreatePerson = async () => {
        const groups: string[] = breakGroupsNamesInputsAndReturnArray(groupsToRelateCreationValue);
        
        const validate: boolean = doesArrayContainsOtherArray(groupsList.map(group => group._id!), groups);
        
        console.log(validate);
        
        if(isNumber(ageCreationValue))
        {   
            if(validate)
            {
                const person: IPerson = {
                    firstName: firstNameCreationValue,
                    lastName: lastNameCreationValue,
                    age: Number(ageCreationValue),
                    groups: groups,
                };

                await PersonService.createPerson(person);

                const newPersonList: IPerson[] = peopleList;
                newPersonList.push(person);
                setPeopleList(newPersonList);
            }

            else {
                await alert("group does'nt exists!");
            }
        }

        else {
            console.log("age is'nt valid!");
        }
        
        handleCloseCreate();
    };


    const handeClickUpdatePerson = () => { // check if inputs (states) are actually in the DB.
        //let breakPeopleFullNamesInputsAndReturnMatrix()
        //GroupService.createGroup({})
        handleCloseEdit();
    };
    
    //add DB functionality to submition
    return (<div id="people">
        <div>{peopleList.length ? peopleList.map((person: IPerson, index: number) =>
            <div id="people-single-card-div">
            <div>
            <div> 
                <div>
                    <p>Person ID: &nbsp;&nbsp; {person._id}</p>
                </div>
                <Button id="edit-button" variant="outlined" onClick={() => handleClickOpenEdit(person._id!)}>Edit</Button> 
                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Edit Person</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        fullWidth
                        variant="standard"
                        onChange={(firstNameUpdateValue) => setFirstNameUpdateValue(firstNameUpdateValue.target.value)}
                        value={firstNameUpdateValue}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        onChange={(lastNameUpdateValue) => setLastNameUpdateValue(lastNameUpdateValue.target.value)}
                        value={lastNameUpdateValue}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Age"
                        fullWidth
                        variant="standard"
                        onChange={(ageUpdateValue) => setAgeUpdateValue(ageUpdateValue.target.value)}
                        value={ageUpdateValue}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Groups to relate to person"
                        fullWidth
                        variant="standard"
                        onChange={(groupsToRelateUpdateValue) => setGroupsToRelateUpdateValue(groupsToRelateUpdateValue.target.value)}
                        value={groupsToRelateUpdateValue}
                    />
                    <DialogContentText>
                        Current groups related to person: {} 
                    </DialogContentText>
                    <List component="div" role="group">
                        {person.groups.map((group: string) => (
                            <ListItemText>
                                <hr />
                                id: {group}
                                <hr />
                            </ListItemText>
                        ))}
                    </List>
                    <DialogContentText>
                        Groups avaliable to person:
                    </DialogContentText>
                    <List component="div" role="group">
                        {groupsList.map((group: IGroup) => (
                            <ListItemText>
                                <hr />
                                name: {group.name}
                                <br />
                                id: {group._id}
                                <hr />
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
            <div id="fields-div"><br/><br /> groups:{person!.groups.map((group: string) => 
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
                onChange={(firstNameCreationValue) => setFirstNameCreationValue(firstNameCreationValue.target.value)}
                value={firstNameCreationValue}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Last Name"
                fullWidth
                variant="standard"
                onChange={(lastNameCreationValue) => setLastNameCreationValue(lastNameCreationValue.target.value)}
                value={lastNameCreationValue}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Age"
                fullWidth
                variant="standard"
                onChange={(ageCreationValue) => setAgeCreationValue(ageCreationValue.target.value)}
                value={ageCreationValue}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Groups to relate the person to"
                fullWidth
                variant="standard"
                onChange={(groupsToRelateCreationValue) => setGroupsToRelateCreationValue(groupsToRelateCreationValue.target.value)}
                value={groupsToRelateCreationValue}
            />
            <DialogContentText>
                Groups available to person: 
            </DialogContentText>
            <List component="div" role="group">
                {groupsList.map((group: IGroup) => (
                    <ListItemText>
                        <hr />
                        name: {group.name}
                        <br />
                        id: {group._id}
                        <hr />
                    </ListItemText>
                ))}
            </List>

            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handeClickCreatePerson}>Create</Button>
            </DialogActions>
        </Dialog>
   </div>)
}

export default People;