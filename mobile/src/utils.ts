export const IS_NODE = true; // false for SPRING / JAVA server

const MY_HOST = '192.168.1.11'; // change to your server / lan IP address, localhost doesn't work!

const node = 'http://' + MY_HOST + ':3001/';

const root = 'http://' + MY_HOST + ':8080/';

const root_api = root + 'api/';

export function getNodePath(path: string) {
  return node + path;
}

export function getPath(path: string) {
  return root + path;
}

export function getRestPath(path = '') {
  return root_api + path;
}

export function getId(model: any) {
  return model.id || model._id;
}

export function validateField(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
