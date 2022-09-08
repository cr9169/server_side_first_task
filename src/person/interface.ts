export interface IPerson {
    firstName: string,
    age: number,
    groups: string[] | IPerson[], // maybe change to an array of type IGroup
    lastName: string
}

export default IPerson;