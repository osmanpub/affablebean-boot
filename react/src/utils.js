import { Client } from "node-rest-client";

const root = "http://localhost:8080/api/";

export const client = new Client();

export function getPath(path) {
  return root + path;
}
