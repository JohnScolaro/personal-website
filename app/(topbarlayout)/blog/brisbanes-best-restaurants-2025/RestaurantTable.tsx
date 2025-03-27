"use client";

import { useState, useMemo } from "react";
import processed_restaurant_data from "./processed_restaurants.json";

function wilsonScoreInterval(avgRating, numReviews, confidence, upper = false) {
    if (numReviews === 0) return 0;
    const p = avgRating / 5;
    const z = confidence;
    const denominator = 1 + (z ** 2 / numReviews);
    const centreAdjustedProbability = p + (z ** 2 / (2 * numReviews));
    const adjustedProbability = (
        centreAdjustedProbability + (upper ? 1 : -1) *
        z * Math.sqrt((p * (1 - p)) / numReviews + (z ** 2 / (4 * numReviews ** 2)))
    ) / denominator;
    return adjustedProbability * 100;
}

export default function RestaurantTable() {
    const [confidence, setConfidence] = useState(1.96);
    const [bestMode, setBestMode] = useState(true);

    const sortedRestaurants = useMemo(() => {
        const restaurantsWithScores = processed_restaurant_data
            .map((restaurant) => ({
                ...restaurant,
                wilson_score: wilsonScoreInterval(restaurant.rating, restaurant.num_reviews, confidence, !bestMode),
            }));

        if (bestMode) {
            const maxScore = Math.max(...restaurantsWithScores.map(r => r.wilson_score));
            return restaurantsWithScores
                .map((restaurant) => ({
                    ...restaurant,
                    normalized_wilson_score: (restaurant.wilson_score / maxScore) * 100,
                }))
                .sort((a, b) => b.wilson_score - a.wilson_score)
                .slice(0, 25);
        } else {
            const minScore = Math.min(...restaurantsWithScores.map(r => r.wilson_score));
            const maxScore = Math.max(...restaurantsWithScores.map(r => r.wilson_score));
            return restaurantsWithScores
                .map((restaurant) => ({
                    ...restaurant,
                    normalized_wilson_score: ((restaurant.wilson_score - minScore) / (maxScore - minScore)) * 100,
                }))
                .sort((a, b) => a.wilson_score - b.wilson_score)
                .slice(0, 25);
        }
    }, [confidence, bestMode]);

    // Helper function to trim restaurant names
    const truncateName = (name, maxLength = 35) => {
        return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="my-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-600">Best</span>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!bestMode}
                            onChange={() => setBestMode(!bestMode)}
                        />
                        <div className="relative w-11 h-6 bg-blue-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:translate-x-0 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
                    </label>
                    <span className="text-xs sm:text-sm text-gray-600">Worst</span>
                </div>
                <div className="flex justify-between items-center my-2">
                    <span className="text-xs sm:text-sm text-gray-600">Rating More Important</span>
                    <span className="text-xs sm:text-sm text-gray-600">Num Reviews More Important</span>
                </div>
                <input
                    type="range"
                    min="1.0"
                    max="7.0"
                    step="0.02"
                    value={confidence}
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    className="w-full mt-2"
                />
            </div>
            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead>
                    <tr className="bg-blue-500 text-white text-xs sm:text-sm">
                        <th className="text-left p-1 sm:p-2">#</th>
                        <th className="text-left p-1 sm:p-2">Name</th>
                        <th className="text-left p-1 sm:p-2">Rating</th>
                        <th className="text-left p-1 sm:p-2">Reviews</th>
                        <th className="text-left p-1 sm:p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRestaurants.map((restaurant, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition duration-200 text-xs sm:text-sm`}
                        >
                            <td className="">{index + 1}</td>
                            <td className="">
                                <a
                                    href={restaurant.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {truncateName(restaurant.name)}
                                </a>
                            </td>
                            <td className="text-left">{restaurant.rating.toFixed(1)}</td>
                            <td className="text-left">{restaurant.num_reviews}</td>
                            <td className="text-left">{restaurant.normalized_wilson_score.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}