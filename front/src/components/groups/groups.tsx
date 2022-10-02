import React, { useEffect, useState } from "react";
import { GroupService } from "../../services/groupService";
import IGroup from "../../interfaces/groupInterface";
import IPerson from "../../interfaces/personInterface";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import "./groups.css"

interface IProps{
    peopleList: IPerson[],
    setPeopleList: React.Dispatch<React.SetStateAction<IPerson[]>>,
    groupsList: IGroup[],
    setGroupsList: React.Dispatch<React.SetStateAction<IGroup[]>>
}

const Groups: React.FC<IProps> = ({peopleList, setPeopleList, groupsList, setGroupsList}) => {

    const [openCreate, setOpenCreate] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [currentGroupID, setCurrentGroupID] = React.useState("");
    const [nameCreationValue, setNameCreationValue] = React.useState("");
    const [groupsToRelateCreationValue, setGroupsToRelateCreationValue] = React.useState("");
    const [peopleToRelateCreationValue, setPeopleToRelateCreationValue] = React.useState("");
    const [groupsToRelateUpdateValue, setGroupsToRelateUpdateValue] = React.useState("");
    const [nameToUpdateValue, setNameToUpdateValue] = React.useState("");
    const [peopleToRelateUpdateValue, setPeopleToRelateUpdateValue] = React.useState("");
    

    const breakGroupsNamesInputsAndReturnArray = (namesInput: string): string[] => {

        return namesInput.split(',').join(' ').trim().split(/\s+/);
    }

    const arrayToMatrix = (array: string[], elementsPerSubArray: number): string[][] => {
        let matrix: string[][] = [], arrayIndex: number, matrixIndex: number;
    
        for (arrayIndex = 0, matrixIndex = -1; arrayIndex < array.length; arrayIndex++) {
            if (arrayIndex % elementsPerSubArray === 0) {
                matrixIndex++;
                matrix[matrixIndex] = [];
            }
    
            matrix[matrixIndex].push(array[arrayIndex]);
        }
    
        return matrix;
    }

    const breakPeopleFullNamesInputsAndReturnMatrix = (namesInput: string): string[][] | null => {
        let namesMatrix: string[][];
        const namesArray: string[] = namesInput.split(',').join(' ').trim().split(/\s+/);
    
        if(namesArray.length%2 != 0)
        {
            alert("One of the people's first or last name is missing!");
            return null; // have to check if the return of the function is'nt null before creating the object that will be inserted to the DB after submiting the dialog,
                         // if it is indeed null just close the dialog without inserting anything to the DB.
        }
    
        return arrayToMatrix(namesArray, 2);
    }

    const fetchData = async () => {
        setGroupsList(await GroupService.getAllGroups());
    }   

    useEffect( () => {
        fetchData();
        console.log(groupsList);
    });

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleClickOpenEdit = (id: string) => {
        setOpenEdit(true);
        setCurrentGroupID(id);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const deleteGroup = (index: number): void => {
        const newGroupList = groupsList;
        const groupToDeleteID: string = newGroupList![index]._id; // how to get id by object (group)
        newGroupList?.splice(index, 1);
        setGroupsList([...newGroupList!]);
        GroupService.deleteGroupByID(groupToDeleteID);
    }

    const handeClickCreatePerson = () => {
        handleCloseCreate();
        //let breakPeopleFullNamesInputsAndReturnMatrix()
        //GroupService.createGroup({})
    };
    
    //add DB functionality to submition
    return (<div id="groups">
        <div>{groupsList.length ? groupsList.map((group: IGroup, index: number) =>
            <div id="groups-single-card-div">
            <div>
                <div>
                    <p>Group ID: &nbsp;&nbsp; {group._id}</p>
                </div>
                <Button id="edit-button" variant="outlined" onClick={() => handleClickOpenEdit(group._id)}>Edit</Button> 
                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Edit Person</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={(nameToRelate) => setNameToUpdateValue(nameToRelate.target.value)}
                        value={nameToUpdateValue}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Groups to relate to group"
                        fullWidth
                        variant="standard"
                        onChange={(groupsToRelateValue) => setGroupsToRelateUpdateValue(groupsToRelateValue.target.value)}
                        value={groupsToRelateUpdateValue}
                    />
                    <DialogContentText>
                        Current groups IDs in group: 
                    </DialogContentText>
                    <List component="div" role="group">
                        {group.groups.map((group: string) => (
                            <ListItemText>
                                {group}
                            </ListItemText>
                        ))}
                    </List>
                    <DialogContentText>
                        Groups avaliable to group:
                    </DialogContentText>
                    <List component="div" role="group">
                        {groupsList.map((group: IGroup) => (
                            currentGroupID !== group._id ? 
                            <ListItemText>
                                name: {group.name}
                                <br />
                                id: {group._id}
                            </ListItemText>: null
                        ))}
                    </List>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="People to relate to group"
                        fullWidth
                        variant="standard"
                        onChange={(peopleToRelateValue) => setPeopleToRelateUpdateValue(peopleToRelateValue.target.value)}
                        value={peopleToRelateUpdateValue}
                    />
                    <DialogContentText>
                        Current people IDs in group:
                    </DialogContentText>
                    <List component="div" role="group">
                        {group.people.map((person: string) => (
                            <ListItemText>
                                {person}
                            </ListItemText>
                        ))}
                    </List>
                    <DialogContentText>
                    People avaliable to group:
                    </DialogContentText>
                    <List component="div" role="group">
                        {peopleList.map((person: IPerson) => (
                            <ListItemText>
                                first name: {person.firstName}
                                <br />
                                last name: {person.lastName}
                                <br />
                                id: {person._id}
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
            <Button id="delete-button" variant="outlined" onClick={() => deleteGroup(index)}>delete</Button>
            <br /><br /><br />
            <div>groups:{group!.groups.map((group: string) => 
                <p>{group ? group : " "}</p>
            )}</div>
            <br /><br /><br />
            <div id="fields-div">people: {group!.people.map((person: string) => 
                <p>{person}</p>
            )}</div>
            </div>):null}        
        </div>
        <Button id="create-button" variant="contained" size="large" onClick={handleClickOpenCreate}>
            Add Group
        </Button>
        <Dialog open={openCreate} onClose={handleCloseCreate}>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    variant="standard"
                    onChange={(nameCreationValue) => setNameCreationValue(nameCreationValue.target.value)}
                    value={nameCreationValue}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Groups to relate to group"
                    fullWidth
                    variant="standard"
                    onChange={(groupsToRelateCreationValue) => setGroupsToRelateCreationValue(groupsToRelateCreationValue.target.value)}
                    value={groupsToRelateCreationValue}
                />
                <DialogContentText>
                    Groups avaliable to group:
                </DialogContentText>
                <List component="div" role="group">
                    {groupsList.map((group: IGroup) => (
                        <ListItemText>
                            name: {group.name}
                            <br />
                            id: {group._id}
                        </ListItemText>
                    ))}
                </List>
                <TextField
                    autoFocus
                    margin="dense"
                    label="People to relate to group"
                    fullWidth
                    variant="standard"
                    onChange={(peopleToRelateCreationValue) => setPeopleToRelateCreationValue(peopleToRelateCreationValue.target.value)}
                    value={peopleToRelateCreationValue}
                />
                <DialogContentText>
                    People avaliable to group:
                </DialogContentText>
                <List component="div" role="group">
                    {peopleList.map((person: IPerson) => (
                        <ListItemText>
                            first name: {person.firstName}
                            <br />
                            last name: {person.lastName}
                            <br />
                            id: {person._id}
                        </ListItemText>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handeClickCreatePerson}>Create</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default Groups;