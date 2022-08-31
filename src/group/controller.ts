import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { groupModel } from "./model";
import {Request, Response, Router} from 'express';
import IGroup from "../group/interface";

const path : string = '/group';
const router = Router();

const groups: IGroup[] = [
    {
        groups: ["sdfsd", "sfsdfs"],
        persons: ["asdas", "asdasd"]
    }
];

function intializeRoutes() : void{
    router.get(path, getGroups);
    router.get(path, createGroup);
}

const getGroups = (request: Request, response: Response) => {
    response.send(groups);
};

const createGroup = (request: Request, response: Response) => {
    const group: IGroup = request.body;
    groups.push(group);
    response.send(group);
};

export default {intializeRoutes};

