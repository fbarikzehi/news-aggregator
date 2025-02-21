import { Filter, Article, NewsSource } from '../types';


const API_KEYS = {
    NEWSAPI: '6ec07b1530f2433ebaa1055dafcb2875',
    GUARDIAN: '8b14134b-3047-4eb6-8712-f89c84272b95',
    NYT: 'LM4nonVqMEkEBR1Kc3eF7jchZUnRTJ8w',
};


class NewsAPI implements NewsSource {
    private apiKey: string;

    constructor() {
        this.apiKey = API_KEYS.NEWSAPI || '';
    }

    getName() { return 'News API'; }

    getURL(filter: Filter) {
        const { keyword, date, category } = filter;
        const baseURL = 'https://newsapi.org/v2/';
        let endpoint = 'everything';
        let params = {
            q: keyword || 'news',
            from: date || '',
            sortBy: 'relevancy',
            apiKey: this.apiKey,
            category: '',
        };
        if (category) {
            endpoint = 'top-headlines';
            params.category = category;
        }
        const queryString = new URLSearchParams(params).toString();
        return `${baseURL + endpoint}?${queryString}`;
    }

    parseResponse(response: any): Article[] {
        if (!response || !response.articles) return [];
        return response.articles.map((item: any) => ({
            id: item.url,
            title: item.title,
            description: item.description,
            content: item.content,
            publishedAt: item.publishedAt,
            url: item.url,
            imageUrl: item.urlToImage || '',
            source: item.source?.name || 'News API',
        }));
    }
}

class GuardianAPI implements NewsSource {
    private apiKey: string;

    constructor() {
        this.apiKey = API_KEYS.GUARDIAN || '';
    }

    getName() { return 'The Guardian'; }

    getURL(filter: Filter) {
        const { keyword, date, category } = filter;
        const baseURL = 'https://content.guardianapis.com/search';
        const params = {
            q: keyword || 'news,',
            'from-date': date || '',
            tag: category || '',
            'api-key': this.apiKey,
        };
        const queryString = new URLSearchParams(params).toString();
        return `${baseURL}?${queryString}`;
    }

    parseResponse(response: any): Article[] {
        if (!response || !response.response || !response.response.results) return [];
        return response.response.results.map((item: any) => {
            const imageUrl = item.fields?.thumbnail || '';
            return {
                id: item.id,
                title: item.webTitle,
                description: item.trailText || '',
                content: '',
                publishedAt: item.webPublicationDate,
                url: item.webUrl,
                imageUrl,
                source: this.getName(),
            };
        });
    }
}

class NYTAPI implements NewsSource {
    private apiKey: string;

    constructor() {
        this.apiKey = API_KEYS.NYT || '';
    }

    getName() { return 'New York Times'; }

    getURL(filter: Filter) {
        const { keyword, date, category } = filter;
        const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        const params = {
            q: keyword || 'news',
            pub_date: date || '',
            news_desk: category || '',
            'api-key': this.apiKey,
        };
        const queryString = new URLSearchParams(params).toString();
        return `${baseURL}?${queryString}`;
    }

    parseResponse(response: any): Article[] {
        if (!response || !response.response || !response.response.docs) return [];
        return response.response.docs.map((item: any) => {
            let imageUrl = '';
            if (item.multimedia && item.multimedia.length > 0) {
                imageUrl = `https://www.nytimes.com/${item.multimedia[0].url}`;
            }
            return {
                id: item.web_url,
                title: item.headline.main,
                description: item.abstract,
                content: '',
                publishedAt: item.pub_date,
                url: item.web_url,
                imageUrl,
                source: this.getName(),
            };
        });
    }
}

const fetchWithErrorHandling = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
};

export const fetchNewsArticles = async (filter: Filter): Promise<Article[]> => {
    const sources: NewsSource[] = [];
    try {
        sources.push(new NewsAPI(), new GuardianAPI(), new NYTAPI());
    } catch (error) {
        console.error('Error initializing news sources:', error);
        return [];
    }

    const selectedSources = sources.filter(source => {
        if (filter.source === '') return true;
        return source.getName() === filter.source;
    });

    const urls = selectedSources.map(source => source.getURL(filter));
    const responses = await Promise.all(urls.map(url => fetchWithErrorHandling(url)));
    const articles: Article[] = [];

    responses.forEach((res, index) => {
        if (res) {
            const source = selectedSources[index];
            const parsedArticles = source.parseResponse(res);
            articles.push(...parsedArticles);
        }
    });

    return articles;
};
