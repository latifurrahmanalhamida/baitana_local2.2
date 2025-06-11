const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = {
    roles: `${BASE_URL}/roles`,
    users: `${BASE_URL}/users`,
    news_categories: `${BASE_URL}/news-categories`,
    news: `${BASE_URL}/news`,
};

export default API;