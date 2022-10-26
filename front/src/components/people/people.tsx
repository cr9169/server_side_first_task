import React, { useEffect, useState } from "react";
import { PersonService } from "../../services/personService";
import IPerson from "../../interfaces/personInterface";
import IGroup from "../../interfaces/groupInterface";
import { GroupService } from "../../services/groupService";
import { Title } from "../customComponents/title";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { breakGroupsNamesInputsAndReturnArray, doesArrayContainsOtherArray, isNumber } from '../../utils';
import "./people.css";

interface IProps{
    peopleList: IPerson[],
    setPeopleList: React.Dispatch<React.SetStateAction<IPerson[]>>,
    groupsList: IGroup[],
    setGroupsList: React.Dispatch<React.SetStateAction<IGroup[]>>,
}

const People: React.FC<IProps> = ({peopleList, setPeopleList, groupsList, setGroupsList}) => {

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentPerson, setCurrentPerson] = useState<IPerson>();
    
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

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleClickOpenEdit = (person: IPerson) => {
        setOpenEdit(true);
        setCurrentPerson(person);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const deletePerson = async (index: number): Promise<void> => {
        const newPeopleList = peopleList;
        const personToDeleteID: string = newPeopleList![index]._id!; // how to get id by object (person)
        newPeopleList?.splice(index, 1);
        setPeopleList([...newPeopleList!]);
        await PersonService.deletePersonByID(personToDeleteID);
    }
    const handeClickCreatePerson = async () => {
        const groups: string[] = breakGroupsNamesInputsAndReturnArray(groupsToRelateCreationValue);
        
        const validate: boolean = doesArrayContainsOtherArray(groupsList.map(group => group._id!), groups);
                
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
                alert("group does'nt exists!");
            }
        }

        else {
            alert("age is'nt valid!");
        }
        
        handleCloseCreate();
    };


    const handeClickUpdatePerson = async (person: IPerson) => { 
        
        const groups: string[] = breakGroupsNamesInputsAndReturnArray(groupsToRelateUpdateValue);
        
        const validate: boolean = doesArrayContainsOtherArray(groupsList.map(group => group._id!), groups);
        
        if(!isNumber(ageUpdateValue))
        {
            console.log("age is'nt valid!"); 
            return;
        }
        
        if(validate)
        {
            const newPerson: IPerson = {
                firstName: firstNameUpdateValue,
                lastName: lastNameUpdateValue,
                age: +ageUpdateValue,
                groups: groups,
            };
            
            console.log(person, person._id);
            
            await PersonService.updatePersonByID(person._id!, newPerson);

            const newPersonList: IPerson[] = peopleList;
            let personIndex: number = peopleList.findIndex(personFromList => personFromList._id === person._id);
            newPersonList[personIndex] = newPerson;
            
            setPeopleList(newPersonList);
        }

        else {
            alert("group doesn't exists!");
        }

        
        handleCloseEdit();
    };
    
    return (<div id="people">
        <div>{peopleList.length ? peopleList.map((person: IPerson, index: number) =>
            <div id="people-single-card-div">
            <div>
            <div> 
                <div>
                    <p>{person._id}</p>
                    <p>{person.firstName}</p>
                    <p>{person.lastName}</p>
                </div>
                <Button id="edit-button" variant="outlined" onClick={() => handleClickOpenEdit(person)}>Edit</Button> 
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
                    <br /><br />
                    <DialogContentText>
                        <Title>{"Current groups related to person: "}</Title>
                    </DialogContentText>
                    <List component="div" role="group">
                        {currentPerson?.groups.map((group: string) => (
                            <ListItemText>
                                <hr />
                                id: {group}
                                <hr />
                            </ListItemText>
                        ))}
                    </List>
                    <br /><br />
                    <DialogContentText>
                    <Title>{"Groups avaliable to person:"}</Title>
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
                    <Button onClick={() => handeClickUpdatePerson(currentPerson!)}>Save</Button> 
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
            <br /><br />
            <DialogContentText>
                <Title>{"Groups available to person:"}</Title>
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