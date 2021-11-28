import { apiEndpoint } from "../config";
import Axios from 'axios';

export async function getTopics(idToken: string): Promise<any[]> {
    console.log('Fetching list of Topics');

    const response = await Axios.get(`${apiEndpoint}/topics`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    });
    console.log('Topics retrieved :', response.data);
    return response.data.items;
}