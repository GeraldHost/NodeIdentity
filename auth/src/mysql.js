import knex from "knex";
import bookshelf from "bookshelf";

const knexInstance = knex({
  client: "mysql",
  connection: {
    host: process.env.DBHOST, 
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    charset: "utf8",
  },
});

export const bookshelfInstance = bookshelf(knexInstance);

export const User = bookshelfInstance.model("User", {
  tableName: "users",
});

