import axios from "axios";
import { config } from "../../src/config";
import IGroup from "../interfaces/groupInterface";

class GroupService {

    static getAllGroups = async() => {
        const groups = await axios.get(`${config.API_BASE_URL}/group/AllGroups`);
        return groups;
    };

    static getGroupByID = async(id: string) => {
        const group = await axios.get(`${config.API_BASE_URL}/group/${id}`);
        return group;
    };

    static deleteGroupByID = async(id: string) => {
        const group = await axios.delete(`${config.API_BASE_URL}/group/${id}`);
        return group;
    };

    static updateGroupByID = async(id: string, group: IGroup) => {
        const updatedGroup = await axios.post(`${config.API_BASE_URL}/group/update/${id}`);
        return updatedGroup;
    };

    static createGroup = async(group: IGroup) => {
        const createdGroup = await axios.post(`${config.API_BASE_URL}/group`);
        return createdGroup;
    };

}