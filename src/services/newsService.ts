import axios from 'axios';
import { Filter, Article } from '../types';

const API_KEYS = {
    NEWSAPI: '6ec07b1530f2433ebaa1055dafcb2875',
    GUARDIAN: '8b14134b-3047-4eb6-8712-f89c84272b95',
    NYT: 'LM4nonVqMEkEBR1Kc3eF7jchZUnRTJ8w',
};

export const fetchNewsArticles = async (filter: Filter): Promise<Article[]> => {
    const { keyword, date, category, source } = filter;

    const newsApiUrl = `https://newsapi.org/v2/everything?q=${keyword || 'news'}&from=${date || ''}&apiKey=${API_KEYS.NEWSAPI}`;

    const guardianUrl = `https://content.guardianapis.com/search?q=${keyword || 'news'}&api-key=${API_KEYS.GUARDIAN}`;

    const nytUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword || 'news'}&api-key=${API_KEYS.NYT}`;

    const [newsApiRes, guardianRes, nytRes] = await Promise.all([
        fetch(newsApiUrl).then((res) => res.json()),
        fetch(guardianUrl).then((res) => res.json()),
        fetch(nytUrl).then((res) => res.json()),
    ]);

    const articlesFromNewsAPI: Article[] = (newsApiRes.articles || []).map((item: any) => ({
        id: item.url,
        title: item.title,
        description: item.description,
        content: item.content,
        publishedAt: item.publishedAt,
        url: item.url,
        imageUrl: '',
        source: item.source.name,
    }));

    const articlesFromGuardian: Article[] = (guardianRes.response.results || []).map((item: any) => ({
        id: item.id,
        title: item.webTitle,
        description: '', // may need additional calls to get full description
        content: '',
        publishedAt: item.webPublicationDate,
        url: item.webUrl,
        imageUrl: '',
        source: 'The Guardian',
    }));

    const articlesFromNYT: Article[] = (nytRes.response.docs || []).map((item: any) => ({
        id: item.web_url,
        title: item.headline.main,
        description: item.abstract,
        content: '',
        publishedAt: item.pub_date,
        url: item.web_url,
        source: 'New York Times',
        imageUrl: '',
        author: item.byline?.original,
    }));

    return [...articlesFromNewsAPI, ...articlesFromGuardian, ...articlesFromNYT];
};
