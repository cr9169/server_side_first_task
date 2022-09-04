import { personModel } from "./model";
import { RequestHandler } from "express";

export const getPerson : RequestHandler = async (req, res, next) => {
    const { firstName, age, groups, lastName } = req.body;

    try {
        const person = await personModel;
    }
} 