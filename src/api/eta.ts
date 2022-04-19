import {API_KMB_ETA_DATA} from '../constants/api';
import {IEtaApiBase} from '../models/eta';

export const getKmbEtaDataFromApi = async (
  route: string,
  service_type: string | number,
) => {
  try {
    const url = API_KMB_ETA_DATA.replace('{route}', `${route}`).replace(
      '{service_type}',
      `${service_type}`,
    );
    console.log(url);

    const response = await fetch(url);
    const json = await response.json();
    return json as IEtaApiBase;
  } catch (error) {
    throw error;
  }
};
