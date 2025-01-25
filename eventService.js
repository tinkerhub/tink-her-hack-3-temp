import axios from 'axios';

export const getEventsNearby = async (lat, long) => {
    try {
        const response = await axios.get(`/api/events?lat=${lat}&long=${long}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};
