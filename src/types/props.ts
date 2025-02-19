import { Article } from ".";

export interface ArticleListProps {
    articles: Article[];
}

export interface SearchBarProps {
    onSearch: () => void;
    setFilters: (filters: any) => void;
}

export interface DatePickerProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}
