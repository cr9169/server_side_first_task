import axios from "axios";
import { config } from "../../src/config";
import IGroup from "../interfaces/groupInterface";

export class GroupService {

    static getAllGroups = async(): Promise<IGroup[]> => {
        const groups: IGroup[] = await axios.get(`${config.API_BASE_URL}group/AllGroups`);
        return groups;
    };

    static getGroupByID = async(id: string): Promise<IGroup> => {
        const group: IGroup = await axios.get(`${config.API_BASE_URL}/group/${id}`);
        return group;
    };

    static deleteGroupByID = async(id: string): Promise<IGroup> => {
        const group: IGroup = await axios.delete(`${config.API_BASE_URL}/group/${id}`);
        return group;
    };

    static updateGroupByID = async(id: string, group: IGroup): Promise<IGroup> => {
        const updatedGroup: IGroup = await axios.post(`${config.API_BASE_URL}/group/update/${id}`, group);
        return updatedGroup;
    };

    static createGroup = async(group: IGroup): Promise<IGroup> => {
        const createdGroup: IGroup = await axios.post(`${config.API_BASE_URL}/group`, group);
        return createdGroup;
    };

}