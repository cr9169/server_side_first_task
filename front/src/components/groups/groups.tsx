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

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
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

    //add DB functionality to submition
    return (<div id="groups">
        <div>{groupsList.length ? groupsList.map((group: IGroup, index: number) =>
            <div id="groups-single-card-div">
            <div>
                <div>
                    <p>Group ID: &nbsp;&nbsp; {group._id}</p>
                </div>
                <Button id="edit-button" variant="outlined" onClick={handleClickOpenEdit}>Edit</Button> 
                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Edit Person</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
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
                        Current groups IDs in group: {} 
                    </DialogContentText>
                    <List component="div" role="group">
                        {group.groups.map((group: string) => (
                            <ListItemText>
                                {group}
                            </ListItemText>
                        ))}
                    </List>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="People to remove from group"
                        fullWidth
                        variant="standard"
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
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleCloseEdit}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Button id="delete-button" variant="outlined" onClick={() => deleteGroup(index)}>delete</Button>
            <div>{group!.groups.map((group: string) => 
                <p>{group ? group : " "}</p>
            )}</div>
            <div id="fields-div">{group!.people.map((person: string) => 
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
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Groups to remove from list"
                    fullWidth
                    variant="standard"
                />
                <DialogContentText>
                    Groups avaliable to group:
                </DialogContentText>
                <List component="div" role="group">
                    {groupsList.map((group: IGroup) => (
                        <ListItemText>
                            {group._id}
                            {group.name}
                        </ListItemText>
                    ))}
                </List>
                <DialogContentText>
                    People avaliable to group:
                </DialogContentText>
                <List component="div" role="group">
                    {peopleList.map((person: IPerson) => (
                        <ListItemText>
                            {person._id}
                            {person.firstName}
                            {person.lastName}
                        </ListItemText>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handleCloseCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default Groups;