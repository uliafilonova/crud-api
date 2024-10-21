import { IncomingMessage, ServerResponse } from 'http';
import { StatusCode, StatusError } from '../status';
import { db } from '../db'
import { sendResponse, uuidValidateV7 } from '../functions';
import { IUserDb } from '../models';


const isExistUser = (id: string): IUserDb | null => {
    const user = db.find((user) => user.id === id);
    return user ? user : null;
};

const validateUserId = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    try {
        if (!uuidValidateV7(id)) {
            sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.UUID_ERROR);
            return false;
        }
        if (!isExistUser(id)) {
            sendResponse(res, StatusCode.NOT_FOUND_404, null, StatusError.USER_NOT_FOUND_ERROR);
            return false;
        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
        return false;
    }
    return true;
};


export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string): Promise<void> => {
    try {
        const validId = await validateUserId(req, res, id);
        if (validId) {
            const findUser = db.find(user => user.id === id)
            sendResponse(res, StatusCode.OK, findUser);
            return
        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
    }
};



