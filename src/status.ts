export const StatusCode = {
    OK: 200,
    CREATE_OK: 201,
    DELETE_OK: 204,
    BAD_REQUEST: 400,
    NOT_FOUND_404: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
};

export const StatusError = {
    SERVER_ERROR: 'An error occurred on the server side',
    ENDPOINT_ERROR: 'Non-existing endpoints',
    METHOD_ERROR: 'Method is invalid',
    USER_NOT_FOUND_ERROR: 'User does not exists with this id',
    UUID_ERROR: 'Provided ID is not a valid uuid value',
    BODY_ERROR: 'Invalid Body',
    REQUARED_FIELDS_ERROR: 'Body does not contain required fields',
    DATA_ERROR: 'Invalid User data',
};