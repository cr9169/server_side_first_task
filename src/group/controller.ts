import { getGroupByIDM, deleteGroupByIDM, createGroupM, updateGroupByIDM, getAllGroupsAndPeopleInGroupM, populateGroups } from "./manager";
import express from "express";

export const getGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getGroupByIDM(req.params.id));
};

export const deleteGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deleteGroupByIDM(req.params.id));
};

export const createGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await createGroupM(req.params.name));
};

export const updateGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updateGroupByIDM(req.body, req.params.id));
};

export const getAllGroupsAndPeopleInGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsAndPeopleInGroupM(req.params.id));
};

export const getPopulatedGroups = async (req:express.Request, res:express.Response) => {
    res.json(await populateGroups());
};
