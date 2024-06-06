export const BaseUrl = "https://rajiv-cab-mu.vercel.app/";

export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
};
