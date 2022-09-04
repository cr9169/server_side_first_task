import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { personModel } from "./model";
import {Request, Response, Router} from 'express';
import IPerson from "../person/interface";

const path : string = '/person';
const router = Router();

const people: IPerson[] = [
    {
        firstName: "dzfzdf",
        age: 45,
        groups: [],
        lastName: "safdsdfsd"
    }
];

function intializeRoutes() : void{
    router.get(path, getPeople);
    router.get(path, createPerson);
}

const getPeople = (request: Request, response: Response) => {
    response.send(people);
};

const createPerson = (request: Request, response: Response) => {
    const person: IPerson = request.body;
    people.push(person);
    response.send(person);
};

export default {intializeRoutes};