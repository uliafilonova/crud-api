import { IncomingMessage, ServerResponse } from "http";
import { IUserDb } from "./models";
import { db, updateDb } from "./db";
import { sendResponse } from "./functions";
import { StatusCode, StatusError } from "./status";
import { getUsers } from "./api/getUsers";

const BASE_ENDPOINT = '/api/users';

export const getRouter = async (req: IncomingMessage, res: ServerResponse) => {
        await router(req, res, db);
};

export const router = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, db:  IUserDb[],
): Promise<IUserDb[] | undefined> => {
    res.setHeader('Content-Type', 'application/json');
    try {
        updateDb(db);
        if (req.url && !req.url.startsWith(BASE_ENDPOINT)) {
            sendResponse(res, StatusCode.NOT_FOUND_404, null, StatusError.ENDPOINT_ERROR);
            return;
        }
        switch (req.method) {
            case 'GET':
                await getUsers(req, res);
                break;
            default:
                sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.METHOD_ERROR);
        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
    }
    return db;
};


