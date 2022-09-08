export interface IGroup {
    groups: string[] | IGroup[], // maybe change to an array of type IGroup
    persons: string[] | IGroup[] // maybe change to an array of type IPerson
}

export default IGroup;