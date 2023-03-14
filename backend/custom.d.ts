// custom.d.ts
declare namespace Express {
    export interface Request {
        userId?: number;
        session: session.Session & Partial<session.SessionData> & { token?: string };
    }
}
