import { fetchJson } from "../lib/fetch-json";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/"


export const getObjectDetails = (objectId, signal) => {
  console.log(`into getObjectDetails for objectId=${objectId} signal=${signal} `);
  return fetchJson(`${BASE_URL}/objects/${objectId}`, { signal });
}
