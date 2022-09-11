import { getPersonByIDM, deletePersonByIDM, createPersonM, updatePersonByIDM, getPersonInGroupByNameM, getAllGroupsOfPersonM, populatePeople } from "./manager";
import express from "express";

export const getPersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonByIDM(req.params.id));
};

export const deletePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deletePersonByIDM(req.params.id));
};

export const createPersonC = async (req:express.Request, res:express.Response) => {
    
    res.json(await createPersonM(req.body));
};

export const updatePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updatePersonByIDM(req.body, req.params.groupID));
};

export const getPersonInGroupByNameC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonInGroupByNameM(req.params.name, req.params.groupID));
};

export const getAllGroupsOfPersonC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsOfPersonM(req.params.id));
};

export const getPopulatedPeople = async (req:express.Request, res:express.Response) => {
    res.json(await populatePeople());
};