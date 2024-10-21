import { IncomingMessage, ServerResponse } from "http";
import { IUserDb } from "./models";
import { db, updateDb } from "./db";
import { sendResponse } from "./functions";
import { StatusCode, StatusError } from "./status";
import { getUsers } from "./api/getUsers";
import { getUser } from "./api/getUser";
import { postUser } from "./api/postUser";

const BASE_ENDPOINT = '/api/users';

export const getRouter = async (req: IncomingMessage, res: ServerResponse) => {
    await router(req, res, db);
};

export const router = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, db: IUserDb[],
): Promise<IUserDb[] | undefined> => {
    res.setHeader('Content-Type', 'application/json');

    let parseUserId: string | null = null;
    if (req.url) {
        parseUserId = req.url.slice(BASE_ENDPOINT.length + 1);
    }


    try {
        updateDb(db);
        if (req.url && !req.url.startsWith(BASE_ENDPOINT)) {
            sendResponse(res, StatusCode.NOT_FOUND_404, null, StatusError.ENDPOINT_ERROR);
            return;
        }
        switch (req.method) {
            case 'GET':
                if (parseUserId) {
                    await getUser(req, res, parseUserId);
                }
                else {
                    await getUsers(req, res);
                }
                break;
            default:
                sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.METHOD_ERROR);

            case 'POST':
                if (parseUserId || (req.url !== BASE_ENDPOINT && req.url !== `${BASE_ENDPOINT}\/`)) {
                    sendResponse(res, StatusCode.NOT_FOUND_404, null, StatusError.ENDPOINT_ERROR );
                } else {
                    await postUser(req, res);
                }
                break;

        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
    }
    return db;
};


