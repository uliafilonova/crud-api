import { IncomingMessage, ServerResponse } from "http";
import { IUserDb } from "./models";
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { StatusCode, StatusError } from "./status";
import { db } from "./db";


export const uuidValidateV7 = (uuid: string): boolean => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 7;
}

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

const hasExpectedProp = (obj: IUserDb, expectedKeys: Array<string>) => {
    for (let key in obj) {
        if (!expectedKeys.includes(key)) {
            return false
        }
    }
    return true
}


export const validUserBody = async (res: ServerResponse, userBody: IUserDb) => {
    try {
        if (!has('age', userBody) ||
            !has('username', userBody) ||
            !has('hobbies', userBody) ||
            //JSON.stringify(Object.keys(userBody).sort()) !== JSON.stringify(['id', 'age', 'username', 'hobbies'].sort())
            !hasExpectedProp(userBody, ['id', 'age', 'username', 'hobbies'])
        ) {
            sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.REQUARED_FIELDS_ERROR,
            );
            return false;
        }
        if((userBody.id && !uuidValidateV7(userBody.id))){
            sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.UUID_ERROR);
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




export const updateByID = (id: string, user: IUserDb) => {
    const indexId = db.findIndex((user) => user.id === id);
    if (indexId !== -1) {
        db[indexId] = { id, ...user };
        return db[indexId];
    }
    else { return null }
};









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

