import * as Paths from '../constants/Paths';

export function makeRequest(type, resource, body){
  return fetch(`${Paths.SERVER}${resource}`, {
    method: type,
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
  .then((resJson) => {
    return resJson;
  })
  .catch(error => {
    console.log("cannot get " + resource + " " + error);
  })
}
