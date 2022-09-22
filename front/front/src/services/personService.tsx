import axios from "axios";
import { config } from "../../src/config";
import IPerson from "../interfaces/personInterface";

class PersonService {

    static getAllPeople = async() => {
        const people = await axios.get(`${config.API_BASE_URL}/person/AllPeople`);
        return people;
    };

    static getPersonByID = async(id: string) => {
        const person = await axios.get(`${config.API_BASE_URL}/person/${id}`);
        return person;
    };

    static deletePersonByID = async(id: string) => {
        const person = await axios.delete(`${config.API_BASE_URL}/person/${id}`);
        return person;
    };

    static updatePersonByID = async(id: string, person: IPerson) => {
        const updatedPerson = await axios.post(`${config.API_BASE_URL}/person/update/${id}`);
        return updatedPerson;
    };

    static createPerson = async(person: IPerson) => {
        const createdPerson = await axios.post(`${config.API_BASE_URL}/person`);
        return createdPerson;
    };

}
