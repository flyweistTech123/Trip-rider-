// export const BaseUrl = "https://rajiv-cab-mu.vercel.app/";
export const BaseUrl = "https://admin.flyweistechnologies.com/api/";

export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
