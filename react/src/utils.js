import { Client } from "node-rest-client";

const root = "http://localhost:8080/";

const root_api = root + "api/";

export const client = new Client();

export function getPath(path) {
  return root + path;
}

export function getRestPath(path) {
  return root_api + path;
}
