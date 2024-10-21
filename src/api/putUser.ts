import { IncomingMessage, ServerResponse } from "http";
import { parseUserBody, sendResponse, updateByID, uuidValidateV7, validUserBody } from "../functions";
import { StatusCode, StatusError } from "../status";

export const putUser = async (req: IncomingMessage, res: ServerResponse, userId: string | null) => {
    try {
        if(userId && !uuidValidateV7(userId)){
            sendResponse(res, StatusCode.BAD_REQUEST, null, StatusError.UUID_ERROR);
        }
        const userBody = await parseUserBody(req, res);
        const isValidBody = await validUserBody(res, userBody);
            if (isValidBody && userId) {
                const user = updateByID(userId, userBody);
                sendResponse(res, StatusCode.OK, user);
            }
        else {
            sendResponse(res, StatusCode.NOT_FOUND_404, null, StatusError.USER_NOT_FOUND_ERROR);
        }
    } catch {
        sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, null, StatusError.SERVER_ERROR);
    }

}