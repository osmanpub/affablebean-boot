const MY_HOST = "192.168.1.12"; // change to your server / lan IP address, localhost doesn't work!

export function getPath(path) {
  return root + path;
}

export function getRestPath(path = "") {
  return root_api + path;
}

export function validateField(value, min, max) {
  return (valid = value >= min && value <= max);
}

const root = "http://" + MY_HOST + ":8080/";

const root_api = root + "api/";
