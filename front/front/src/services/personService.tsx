import axios from "axios";
import { config } from "../../src/config";
import IPerson from "../interfaces/personInterface";

class PersonService {

    static getAllPeople = async(): Promise<IPerson[]> => {
        const people: IPerson[] = await axios.get(`${config.API_BASE_URL}/person/AllPeople`);
        return people;
    };

    static getPersonByID = async(id: string): Promise<IPerson> => {
        const person: IPerson = await axios.get(`${config.API_BASE_URL}/person/${id}`);
        return person;
    };

    static deletePersonByID = async(id: string): Promise<IPerson> => {
        const person: IPerson = await axios.delete(`${config.API_BASE_URL}/person/${id}`);
        return person;
    };

    static updatePersonByID = async(id: string, person: IPerson): Promise<IPerson> => {
        const updatedPerson: IPerson = await axios.post(`${config.API_BASE_URL}/person/update/${id}`);
        return updatedPerson;
    };

    static createPerson = async(person: IPerson): Promise<IPerson> => {
        const createdPerson: IPerson = await axios.post(`${config.API_BASE_URL}/person`);
        return createdPerson;
    };

}
