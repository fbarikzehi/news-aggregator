import axios from 'axios';

const API_KEYS = {
    NEWSAPI: '6ec07b1530f2433ebaa1055dafcb2875',
    GUARDIAN: '8b14134b-3047-4eb6-8712-f89c84272b95',
    NYT: 'LM4nonVqMEkEBR1Kc3eF7jchZUnRTJ8w',
};

export const fetchArticles = async (filters: any) => {
    const { keyword, category, source } = filters;
    const [newsApiResults, guardianResults, nytResults] = await Promise.all([
        axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEYS.NEWSAPI}`),
        axios.get(`https://content.guardianapis.com/search?q=${keyword}&api-key=${API_KEYS.GUARDIAN}`),
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEYS.NYT}`),
    ]);
    return [
        ...newsApiResults.data.articles,
        ...guardianResults.data.response.results,
        ...nytResults.data.response.docs,
    ];
};