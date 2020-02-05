// @ts-ignore
import { Client } from "node-rest-client";

export const IS_NODE = true; // false for SPRING / JAVA server

const node = "http://localhost:3001/";

const root = "http://localhost:8080/";

const root_api = root + "api/";

export const client = new Client();

export function getNodePath(path: string) {
  return node + path;
}

export function getPath(path: string) {
  return root + path;
}

export function getRestPath(path: string) {
  return root_api + path;
}

export function validateField(
  input: any,
  error: any,
  min: number,
  max: number
) {
  let { value } = input.current || "";
  let { length } = value;
  let valid = length >= min && length <= max;

  error.current.style.display = valid ? "none" : "block";
  return valid;
}
