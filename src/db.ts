import { IUserDb } from './models';

export let db: IUserDb[] = [];

export const updateDb= (user: IUserDb[])  => {
    db = user;
};
