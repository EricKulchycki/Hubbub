import * as Paths from '../constants/Paths';

export function makeRequest(type, resource){
      return fetch(`${Paths.SERVER}${resource}`, {
        method: type
      })
      .then((res) => res.json())
      .then((resJson) => {
        return resJson;
      })
      .catch(error => {
        console.log("cannot get " + resource);
      })
  }
}
