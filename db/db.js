import pkg  from "pg";
const {Pool} = pkg;

export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'softjobs',
    allowExitOnIdle: true
})
