export interface IGroup {
    _id: string,
    name: string,
    groups: string[], // maybe change to an array of type IGroup
    people: string[] // maybe change to an array of type IPerson
}

export default IGroup;