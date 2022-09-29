import React, { useEffect, useState } from "react";
import { GroupService } from "../../services/groupService";
import IGroup from "../../interfaces/groupInterface";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./groups.css"

interface IProps{

}

const Groups: React.FC<IProps> = ({}) => {

    const [open, setOpen] = React.useState(false);
    const [groupsList, setGroupsList] = useState<IGroup[]>([]);

    const fetchData = async () => {
        setGroupsList(await GroupService.getAllGroups());
    }   

    useEffect( () => {
        fetchData();
        console.log(groupsList);
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
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
            <div>
            <div>
                <Button id="edit-button" variant="outlined" onClick={handleClickOpen}>Edit</Button> 
                <Dialog open={open} onClose={handleClose}>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="People to remove from group"
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
            <Button id="delete-button" variant="outlined" onClick={() => deleteGroup(index)}>delete</Button>
            <div>{group!.groups.map((group: string) => 
                <p>{group ? group : " "}</p>
            )};</div>
            <br /><br />
            <div>{group!.people.map((person: string) => 
                <p>{person}</p>
            )};</div>
            </div>):null}        
        </div>
    </div>);
}

export default Groups;