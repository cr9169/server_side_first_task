import IPerson from "../person/interface";

export interface IGroup {
    name: string
    groups: string[], // maybe change to an array of type IGroup
    people: string[] // maybe change to an array of type IPerson
}

export default IGroup;