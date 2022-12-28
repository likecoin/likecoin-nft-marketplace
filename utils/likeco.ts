import axios, { AxiosError } from 'axios';
import { LIKE_CO_API } from '~/constant';

export async function queryWritingNFTData(classId: string) {
  try {
    const res = await axios.get(`${LIKE_CO_API}/likernft/purchase?class_id=${classId}`);
    return res.data;
  } catch (err) {
    if ((err as AxiosError).response?.status !== 404) {
      console.error(JSON.stringify(err));
    }
    return null;
  }
}

export default queryWritingNFTData;
