import { getPersonByIDM, deletePersonByIDM, createPersonM, updatePersonByIDM, getPersonInGroupByNameM, getAllGroupsOfPersonM } from "./manager";
import mongoose from "mongoose";
import express from "express";

export const getPersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonByIDM(new mongoose.Types.ObjectId((req.params.id))));
};

export const deletePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deletePersonByIDM(new mongoose.Types.ObjectId((req.params.id))));
};

export const createPersonC = async (req:express.Request, res:express.Response) => {
    
    res.json(await createPersonM(req.body));
};

export const updatePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updatePersonByIDM(req.body, new mongoose.Types.ObjectId((req.params.groupID))));
};

export const getPersonInGroupByNameC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonInGroupByNameM(req.params.name, new mongoose.Types.ObjectId((req.params.groupID))));
};

export const getAllGroupsOfPersonC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsOfPersonM(new mongoose.Types.ObjectId((req.params.id))));
};