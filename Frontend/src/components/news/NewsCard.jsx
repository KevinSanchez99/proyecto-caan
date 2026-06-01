import React from 'react';
import {Link} from 'react-router-dom';
import newsData from "./NewsData.json"

const NewsCard = ({ article }) => (
    <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] group border border-outline-variant/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
        <div className="h-48 overflow-hidden relative">
            <img
                src={article.image}
                alt={article.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
                <span className="bg-surface/90 backdrop-blur text-on-surface font-label-sm text-label-sm px-2 py-1 rounded-md text-xs">
                    {article.category}
                </span>
            </div>
        </div>
        <div className="p-8">
            <div className="text-outline font-label-sm text-label-sm mb-2 text-xs">
                {article.date}
            </div>
            <h3 className="font-h3 text-h3 text-on-surface mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">
                {article.description}
            </p>
        </div>
    </article>
);

export default NewsCard;