import { getGroupByIDM, deleteGroupByIDM, createGroupM, updateGroupByIDM, getAllGroupsAndPeopleInGroupM, populateGroups, getAllGroupsM } from "./manager";
import express from "express";

export const getGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getGroupByIDM(req.params.id));
};

export const getAllGroupsC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsM());
};

export const deleteGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deleteGroupByIDM(req.params.id));
};

export const createGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await createGroupM(req.body.name));
};

export const updateGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updateGroupByIDM(req.body, req.body._id));
};

export const getAllGroupsAndPeopleInGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsAndPeopleInGroupM(req.params.id));
};

export const getPopulatedGroups = async (req:express.Request, res:express.Response) => {
    res.json(await populateGroups());
};


