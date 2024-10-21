import { IncomingMessage, ServerResponse } from "http";
import { StatusCode, StatusError } from "../status";
import { parseUserBody, sendResponse, validUserBody } from "../functions";
import { db } from "../db";
import { v7 as uuidv7 } from 'uuid';

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
