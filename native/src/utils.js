export function getPath(path) {
  return root + path;
}

export function getRestPath(path) {
  return root_api + path;
}

export function validateField(input, error, min, max) {
  let { value } = input.current || "";
  let { length } = value;
  let valid = length >= min && length <= max;

  error.current.style.display = valid ? "none" : "block";
  return valid;
}

const root = "http://localhost:8080/";

const root_api = root + "api/";
