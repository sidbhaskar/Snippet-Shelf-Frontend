import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchDashboardStats } from '../api/services';
import { useAuth } from './AuthContext';

const StatsContext = createContext();

export const useStats = () => {
    return useContext(StatsContext);
};

export const StatsProvider = ({ children }) => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalSnippets: 0,
        totalFavorites: 0,
        totalTags: 0,
        languageCounts: {},
        tagCounts: {}
    });
    const [loading, setLoading] = useState(false);

    const refreshStats = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const data = await fetchDashboardStats();
            if (data) {
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to refresh stats", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            refreshStats();
        } else {
            // Reset stats on logout
            setStats({
                totalSnippets: 0,
                totalFavorites: 0,
                totalTags: 0,
                languageCounts: {},
                tagCounts: {}
            });
        }
    }, [user, refreshStats]);

    const value = {
        stats,
        loading,
        refreshStats
    };

    return (
        <StatsContext.Provider value={value}>
            {children}
        </StatsContext.Provider>
    );
};
