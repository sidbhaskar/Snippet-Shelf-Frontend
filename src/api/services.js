import api from './axios';

// Dashboard
// Note: Dashboard endpoints are not in the Postman collection.
// We will mock them or derive from snippets for now to prevent errors.
export const fetchDashboardStats = async () => {
    // Placeholder: Return mock data or derive from fetchSnippets if needed
    // const response = await api.get('/dashboard/stats');
    // return response.data;
    return {
        totalSnippets: 0,
        collections: 0,
        languages: 0,
        favorites: 0
    };
};

export const fetchQuickStats = async () => {
    // Placeholder
    // const response = await api.get('/dashboard/quickstats');
    // return response.data;
    return {
        thisWeek: "0 snippets",
        mostUsed: "N/A",
        favorites: "0 items",
        collections: "0 active",
        popularTags: []
    };
};

// Snippets
export const fetchSnippets = async (params = {}) => {
    // params: { sort, limit, offset }
    // Postman shows /api/snippet for pagination and /api/snippet/all for all
    // If params has limit/offset, use /snippet, else use /snippet/all

    try {
        if (params.limit || params.offset || params.sort) {
            const response = await api.get('/snippet', { params });
            return response.data;
        } else {
            const response = await api.get('/snippet/all');
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching snippets:", error);
        throw error; // Let component handle it, but log it here
    }
};

export const createSnippet = async (data) => {
    const response = await api.post('/snippet', data);
    return response.data;
};

export const fetchSnippetById = async (id) => {
    const response = await api.get(`/snippet/${id}`);
    return response.data;
};

// Collections
export const fetchCollections = async () => {
    // Not in Postman, returning empty array to prevent crash
    // const response = await api.get('/collections');
    // return response.data;
    return [];
};
