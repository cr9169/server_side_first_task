import React, { useEffect, useState } from "react";
import { GroupService } from "../../services/groupService";
import { PersonService } from "../../services/personService";
import IGroup from "../../interfaces/groupInterface";
import IPerson from "../../interfaces/personInterface";
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
import "./groups.css"

interface IProps{
    peopleList: IPerson[],
    setPeopleList: React.Dispatch<React.SetStateAction<IPerson[]>>,
    groupsList: IGroup[],
    setGroupsList: React.Dispatch<React.SetStateAction<IGroup[]>>
}

const Groups: React.FC<IProps> = ({peopleList, setPeopleList, groupsList, setGroupsList}) => {

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentGroup, setCurrentGroup] = useState<IGroup>();

    // create: 
    const [nameCreationValue, setNameCreationValue] = useState<string>("");

    // update:
    const [nameToUpdateValue, setNameToUpdateValue] = useState<string>(""); 
    const [groupsToRelateUpdateValue, setGroupsToRelateUpdateValue] = useState<string>("");
    const [peopleToRelateUpdateValue, setPeopleToRelateUpdateValue] = useState<string>("");

    const breakGroupsNamesInputsAndReturnArray = (namesInput: string): string[] => {

        if(namesInput === "")
            return [];
        return namesInput.split(',').join(' ').trim().split(/\s+/);
    }

    const doesArrayContainsOtherArray = (firstArray: string[], secondArray: string[]): boolean => {
        if(secondArray.length === 0)
            return true;
        return secondArray.every(group => firstArray.includes(group));
    }
    
    const fetchData = async () => {
        setPeopleList(await PersonService.getAllPeople());
        setGroupsList(await GroupService.getAllGroups());
    }   

    useEffect( () => {
        fetchData();
    }, []);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleClickOpenEdit = (group: IGroup) => {
        setOpenEdit(true);
        setCurrentGroup(group);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const deleteGroup = (index: number): void => {
        const newGroupList = groupsList;
        const groupToDeleteID: string = newGroupList![index]._id!; 
        newGroupList?.splice(index, 1);
        setGroupsList([...newGroupList!]);
        GroupService.deleteGroupByID(groupToDeleteID);
    }

    const handeClickCreateGroup = async () => { 

        const group: IGroup = {
            name: nameCreationValue,
            groups: [],
            people: []
        };

            await GroupService.createGroup(nameCreationValue);

            const newGroupList: IGroup[] = groupsList;
            newGroupList.push(group);
            setGroupsList(newGroupList);

            handleCloseCreate();
            fetchData();
    };

    const handeClickUpdateGroup = async (group: IGroup) => { 
        
        const groups: string[] = breakGroupsNamesInputsAndReturnArray(groupsToRelateUpdateValue);
        const people: string[] = breakGroupsNamesInputsAndReturnArray(peopleToRelateUpdateValue);
        
        const validate: boolean = doesArrayContainsOtherArray(groupsList.map(group => group._id!), groups) &&
            doesArrayContainsOtherArray(peopleList.map(person => person._id!), people);

        
        if(validate)
        {
            const newGroup: IGroup = {
                name: nameToUpdateValue,
                groups: groups,
                people: people
            };
            
            await GroupService.updateGroupByID(group._id!, newGroup);

                const newGroupList: IGroup[] = groupsList;
                let groupIndex: number = groupsList.findIndex(groupListElement => groupListElement._id === group._id);
                
                newGroupList[groupIndex] = newGroup;
                setGroupsList(newGroupList);

        }

        else {
            alert("group or person does'nt exists!");
        }

        handleCloseEdit();
        fetchData();
    };
    
    //add DB functionality to submition
    return (<div id="groups">
        <div>{groupsList.length ? groupsList.map((group: IGroup, index: number) =>
            <div id="groups-single-card-div">
            <div>
                <div>
                    <p>Group ID: &nbsp;&nbsp; {group._id}</p>
                </div>
                <Button id="edit-button" variant="outlined" onClick={() => handleClickOpenEdit(group)}>Edit</Button> 
                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Edit Group</DialogTitle>
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
                    <br /><br />
                    <DialogContentText>
                        <Title>{"Current groups IDs in group: "}</Title>
                    </DialogContentText>
                    <List component="div" role="group">
                        {currentGroup?.groups.map((group: string) => (
                            <ListItemText>
                                <hr />
                                {group}
                                <hr />
                            </ListItemText>
                        ))}
                    </List>
                    <br /><br />
                    <DialogContentText>
                        <Title>{"Groups avaliable to group:"}</Title>
                    </DialogContentText>
                    <List component="div" role="group">
                        {groupsList.map((group: IGroup) => (
                            currentGroup?._id !== group._id ? 
                            <ListItemText>
                                <hr />
                                name: {group.name}
                                <br />
                                id: {group._id}
                                <hr />
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
                    <br /><br />
                    <DialogContentText>
                        <Title>{"Current people IDs in group:"}</Title>
                    </DialogContentText>
                    <List component="div" role="group">
                        {currentGroup?.people.map((person: string) => (
                            <ListItemText>
                                <hr />
                                {person}
                                <hr />
                            </ListItemText>
                        ))}
                    </List>
                    <br /><br />
                    <DialogContentText>
                        <Title>{"People avaliable to group:"}</Title>
                    </DialogContentText>
                    <List component="div" role="group">
                        {peopleList.map((person: IPerson) => (
                            <ListItemText>
                                <hr />
                                first name: {person.firstName}
                                <br />
                                last name: {person.lastName}
                                <br />
                                id: {person._id}
                                <hr />
                            </ListItemText>
                        ))}
                    </List>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={() => handeClickUpdateGroup(currentGroup!)}>Save</Button>
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
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handeClickCreateGroup}>Create</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default Groups;