import axios from "axios";
import { config } from "../../src/config";
import IGroup from "../interfaces/groupInterface";

export class GroupService {

    static getAllGroups = async(): Promise<IGroup[]> => {
        const groups: IGroup[] = await (await axios.get(`${config.API_BASE_URL}group/AllGroups`)).data;
        return groups;
    };

    static getGroupByID = async(id: string): Promise<IGroup> => {
        const group: IGroup = await (await axios.get(`${config.API_BASE_URL}group/${id}`)).data;
        return group;
    };

    static deleteGroupByID = async(id: string): Promise<IGroup> => {
        const group: IGroup = await (await axios.delete(`${config.API_BASE_URL}group/${id}`)).data;
        return group;
    };

    static updateGroupByID = async(id: string, group: IGroup): Promise<IGroup> => {
        const updatedGroup: IGroup = await (await axios.post(`${config.API_BASE_URL}group/update/${id}`, group)).data;
        return updatedGroup;
    };

    static createGroup = async(group: IGroup): Promise<IGroup> => {
        const createdGroup: IGroup = await (await axios.post(`${config.API_BASE_URL}group`, group)).data;
        return createdGroup;
    };

}