import React from 'react';

function SkeletonCard() {
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm bg-white animate-pulse">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-300 w-full"></div>
            
            {/* Content Placeholders */}
            <div className="p-4 flex flex-col gap-2">
                <div className="h-4 bg-gray-300 w-1/4 rounded"></div> {/* Category */}
                <div className="h-6 bg-gray-300 w-3/4 rounded"></div> {/* Title */}
                <div className="h-4 bg-gray-300 w-1/2 rounded"></div> {/* Price */}
            </div>
        </div>
    );
}

export default SkeletonCard;