DROP DATABASE IF EXISTS usersdb;
CREATE DATABASE usersdb;

\c usersdb;

CREATE TABLE users (
 email        TEXT PRIMARY KEY NOT NULL,
 first_name   TEXT             NOT NULL,
 last_name    TEXT             NOT NULL,
 pass         TEXT             NOT NULL
);