import React from 'react';
import { Article } from ".";
import { RootState } from "../store";

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

export interface SelectProps {
    label: string;
    options: string[];
    filterKey: keyof RootState['news']['filters'];
    className?: string;
}


type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}


export interface SearchBarProps {
    onSearch: () => void;
}


export interface InputProps {
    id?: string;
    label?: string;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    error?: string;
}

export interface CardProps {
    article: Article;
    className?: string;
}
