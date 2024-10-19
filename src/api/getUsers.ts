import { IncomingMessage, ServerResponse } from 'http';
import { StatusCode, StatusError } from '../status';
import { db } from '../db'
import { sendResponse } from '../functions';

export const USERS_URL = /^[\/](api\/users)[\/]?$/;

export const getUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        if (!USERS_URL.test(req.url as string)) {
            sendResponse(res, StatusCode.NOT_FOUND_404, null, StatusError.ENDPOINT_ERROR);
            return
        }
        sendResponse(res, StatusCode.OK, db);
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
    }
};



