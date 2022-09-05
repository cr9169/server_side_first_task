import { getGroupByIDM, deleteGroupByIDM, createGroupM, updateGroupByIDM, getAllGroupsAndPeopleInGroupM } from "./manager";
import mongoose from "mongoose";
import express from "express";

export const getGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getGroupByIDM(new mongoose.Schema.Types.ObjectId((req.params.id))));
};

export const deleteGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deleteGroupByIDM(new mongoose.Schema.Types.ObjectId((req.params.id))));
};

export const createGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await createGroupM(req.body))
};

export const updateGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updateGroupByIDM(req.body, new mongoose.Schema.Types.ObjectId((req.params.groupID))));
};

export const getAllGroupsAndPeopleInGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsAndPeopleInGroupM(new mongoose.Schema.Types.ObjectId((req.params.id))));
};
