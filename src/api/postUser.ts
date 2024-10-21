import { IncomingMessage, ServerResponse } from "http";
import { StatusCode, StatusError } from "../status";
import { sendResponse } from "../functions";
import { db } from "../db";
import { IUserDb } from "../models";
import { v7 as uuidv7 } from 'uuid';




export const parseUserBody = (req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<IUserDb> => {
    return new Promise((resolve) => {
        const data: Uint8Array[] = [];
        req
            .on('data', chunk => data.push(chunk.toString()))
            .on('end', () => {
                try {
                    const body = data.join();
                    resolve(JSON.parse(body));
                }
                catch {
                    sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.BODY_ERROR);
                }
            });
    });
};

const has = <K extends string>(key: K, x: object): x is { [key in K]: unknown } => (
    key in x
);

export const validUserBody = async (res: ServerResponse, userBody: IUserDb) => {
    try {
   
        if (!has('age', userBody) || !has('username', userBody) || !has('hobbies', userBody) || Object.keys(userBody).length > 3) {
            sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.REQUARED_FIELDS_ERROR,
            );
            return false;
        }
        if (
            typeof userBody.username !== 'string' ||
            typeof userBody.age !== 'number' ||
            !Array.isArray(userBody.hobbies) ||
            !(userBody.hobbies.every(val => typeof val === 'string'))
        ) {
            sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.DATA_ERROR);
            return false;
        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
        return false;
    }
    return true;
};




export const postUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        const userBody = await parseUserBody(req, res);
        const isValid = await validUserBody(res, userBody);
        if (isValid) {
            const user = { id: uuidv7(), ...userBody };
            db.push(user);
            sendResponse(res, StatusCode.CREATE_OK, user);
        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
    }
};
