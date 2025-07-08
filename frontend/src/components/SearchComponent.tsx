import React, { useState, useEffect } from 'react';
import { SearchIcon } from './icons/searchIcon';
import { YoutubeIcon } from './icons/youtubeIcon';
import { TwitterIcon } from './icons/twitterIcon';
import { UrlIcon } from './icons/urlIcon';
import { CloseIcon } from './icons/closeIcon';

interface SearchComponentProps {
    onSearchChange: (searchTerm: string) => void;
    onFiltersChange: (filters: SearchFilters) => void;
    availableTags: string[];
}

export interface SearchFilters {
    contentType: string[];
    tags: string[];
}

export function SearchComponent({ onSearchChange, onFiltersChange, availableTags }: SearchComponentProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
        contentType: [],
        tags: []
    });

    const contentTypes = [
        { value: 'youtube', label: 'YouTube', icon: <YoutubeIcon />, color: 'text-red-600' },
        { value: 'twitter', label: 'Twitter', icon: <TwitterIcon />, color: 'text-blue-500' },
        { value: 'url', label: 'Links', icon: <UrlIcon size="lg" />, color: 'text-gray-600' }
    ];

    useEffect(() => {
        onSearchChange(searchTerm);
    }, [searchTerm, onSearchChange]);

    useEffect(() => {
        onFiltersChange(filters);
    }, [filters, onFiltersChange]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleContentTypeToggle = (type: string) => {
        setFilters(prev => ({
            ...prev,
            contentType: prev.contentType.includes(type)
                ? prev.contentType.filter(t => t !== type)
                : [...prev.contentType, type]
        }));
    };

    const handleTagToggle = (tag: string) => {
        setFilters(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            contentType: [],
            tags: []
        });
        setSearchTerm('');
    };

    const getActiveFiltersCount = () => {
        return filters.contentType.length + filters.tags.length;
    };

    return (
        <div className='pt-8 px-4'>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 ">
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon size="lg" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title or tags..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                        {getActiveFiltersCount() > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                                {getActiveFiltersCount()}
                            </span>
                        )}
                    </button>

                    {getActiveFiltersCount() > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors bg-red-50 rounded-lg hover:bg-red-100"
                        >
                            <div className="w-4 h-4 flex items-center justify-center">
                                <CloseIcon />
                            </div>
                            Clear all
                        </button>
                    )}
                </div>

                {showFilters && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">Content Type</h3>
                                <div className="space-y-2">
                                    {contentTypes.map(type => (
                                        <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.contentType.includes(type.value)}
                                                onChange={() => handleContentTypeToggle(type.value)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div className={`flex items-center gap-2 ${type.color}`}>
                                                {type.icon}
                                                <span className="text-sm text-gray-700">{type.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">Tags</h3>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {availableTags.slice(0, 10).map(tag => (
                                        <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.tags.includes(tag)}
                                                onChange={() => handleTagToggle(tag)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{tag}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {getActiveFiltersCount() > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {filters.contentType.map(type => (
                            <span key={type} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                {type}
                                <button
                                    onClick={() => handleContentTypeToggle(type)}
                                    className="ml-2 hover:text-blue-600 flex items-center justify-center"
                                >
                                    <div className="w-3 h-3 flex items-center justify-center">
                                        <CloseIcon />
                                    </div>
                                </button>
                            </span>
                        ))}
                        {filters.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                {tag}
                                <button
                                    onClick={() => handleTagToggle(tag)}
                                    className="ml-2 hover:text-green-600 flex items-center justify-center"
                                >
                                    <div className="w-3 h-3 flex items-center justify-center">
                                        <CloseIcon />
                                    </div>
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
