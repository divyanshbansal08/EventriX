import { api } from "./api"

export const getEvents = async () => {
    try {
        const response = await api.get("/event");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}
export const getEventById = async (id) => {
    try {
        const response = await api.get(`/event/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}


export const getEventsByClub = async (clubID) => {
    try {
        const response = await api.get(`/event/clubs/${clubID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events by club:", error);
        throw error;
    }
}

//Assuming you have a similar endpoint for councils and cells
export const getEventsByCouncil = async (clubID) => {
    try {
        const response = await api.get(`/event/councils/${clubID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events by council:", error);
        throw error;
    }
}

//Assuming you have a similar endpoint for councils and cells
export const getEventsByCell = async (clubID) => {
    try {
        const response = await api.get(`/event/cells/${clubID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events by cell:", error);
        throw error;
    }
}


export const createEvent = async (eventData) => {
    try {
        const response = await api.post("/admin/createEvent", eventData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
}