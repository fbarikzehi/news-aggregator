

export interface Headline {
    main: string
}


export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    url: string;
    source: string;
    author?: string;
    category?: string;
    headline: Headline,
    snippet: string,
    webTitle: string,
    imageUrl: string,
}


export interface Filter {
    keyword: string;
    date: Date | '';
    category: string;
    source: string;
}

export interface NewsState {
    articles: Article[];
    loading: boolean;
    error: string | null;
    filters: Filter;
}


export interface NewsSource {
    getName(): string;
    getURL(filter: Filter): string;
    parseResponse(response: any): Article[];
}
