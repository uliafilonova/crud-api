import { ServerResponse } from "http";
import { IUserDb } from "./models";
import { validate as uuidValidate, version as uuidVersion } from 'uuid';


export const uuidValidateV7 = (uuid: string): boolean => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 7;
}


export const sendResponse = (
    res: ServerResponse,
    statusCode: number,
    response?: IUserDb | IUserDb[] | undefined | null,
    message?: string,
): void => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    if (response) {
        res.end(JSON.stringify({ code: statusCode, response }));
    }
    else {
        res.end(JSON.stringify({ code: statusCode, message }));
    }
};

