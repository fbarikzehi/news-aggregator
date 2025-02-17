

export interface Article {
    url: string,
    title: string,
    headline: Headline,
    description: string,
    snippet: string,
    content: string,
    webTitle: string,
    abstract: string,
    author: string,
    source: string,
    publishedAt: Date
}

export interface Headline {
    main: string
}