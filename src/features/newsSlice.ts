import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, Filter, NewsState } from '../types';

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
    filters: { category: '', date: '', keyword: '', source: '' },
};


const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setArticles: (state, action: PayloadAction<any[]>) => {
            state.articles = action.payload;
        },
        setFilters: (state, action: PayloadAction<Partial<Filter>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
    },
});

export const { setArticles, setFilters } = newsSlice.actions;
export default newsSlice.reducer;