import { IncomingMessage, ServerResponse } from "http";
import { db } from "../db";
import { sendResponse, uuidValidateV7 } from "../functions";
import { StatusCode, StatusError } from "../status";
import { IUserDb } from "../models";

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, userId: string | null) => {
    try {
        if(userId && !uuidValidateV7(userId)){
            sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.UUID_ERROR);
        }
        const user = db.find(user => user.id === userId);
        if (user) {
            const indexId = db.findIndex((user: IUserDb) => user.id === userId);
            db.splice(indexId, 1);
            sendResponse(res, StatusCode.DELETE_OK, user);
            return
        }
        else {
            sendResponse(res, StatusCode.NOT_FOUND_404, null, StatusError.USER_NOT_FOUND_ERROR);
        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
    }

}