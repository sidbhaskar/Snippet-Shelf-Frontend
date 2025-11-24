import api from './axios';

// Dashboard
// Note: Dashboard endpoints are not in the Postman collection.
// We will mock them or derive from snippets for now to prevent errors.
export const fetchDashboardStats = async () => {
    try {
        const response = await api.get('/snippet/statistics');
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Return default structure on error to prevent crashes
        return {
            totalSnippets: 0,
            totalFavorites: 0,
            totalTags: 0,
            languageCounts: {},
            tagCounts: {}
        };
    }
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
