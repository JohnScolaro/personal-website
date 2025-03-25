"use client";

import { useState, useMemo } from "react";
import processed_restaurant_data from "./processed_restaurants.json";

function wilsonScoreInterval(avgRating, numReviews, confidence) {
    if (numReviews === 0) return 0;
    const p = avgRating / 5;
    const z = confidence;
    const denominator = 1 + (z ** 2 / numReviews);
    const centreAdjustedProbability = p + (z ** 2 / (2 * numReviews));
    const adjustedProbability = (
        centreAdjustedProbability -
        z * Math.sqrt((p * (1 - p)) / numReviews + (z ** 2 / (4 * numReviews ** 2)))
    ) / denominator;
    return adjustedProbability * 100;
}

export default function RestaurantTable() {
    const [confidence, setConfidence] = useState(1.96);

    const sortedRestaurants = useMemo(() => {
        const restaurantsWithScores = processed_restaurant_data
            .map((restaurant) => ({
                ...restaurant,
                wilson_score: wilsonScoreInterval(restaurant.rating, restaurant.num_reviews, confidence),
            }))
            .sort((a, b) => b.wilson_score - a.wilson_score); // Sort by wilson_score

        const maxScore = restaurantsWithScores[0]?.wilson_score || 0; // Get the maximum wilson_score

        // Normalize the scores to make the top score 100
        const normalizedRestaurants = restaurantsWithScores.map((restaurant) => ({
            ...restaurant,
            normalized_wilson_score: (restaurant.wilson_score / maxScore) * 100,
        }));

        return normalizedRestaurants.slice(0, 25); // Show only the top 25
    }, [confidence]);

    // Helper function to trim restaurant names
    const truncateName = (name, maxLength = 35) => {
        return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="my-4">
                <div className="flex justify-between items-center my-2">
                    <span className="text-sm text-gray-600">Rating More Important</span>
                    <span className="text-sm text-gray-600">Num Reviews More Important</span>
                </div>
                <input
                    type="range"
                    min="1.0"
                    max="7.0"
                    step="0.01"
                    value={confidence}
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    className="w-full mt-2"
                />
            </div>
            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead>
                    <tr className="bg-blue-500 text-white text-xs sm:text-sm">
                        <th className="text-left">#</th>
                        <th className="text-left">Name</th>
                        <th className="text-left">Rating</th>
                        <th className="text-left">Reviews</th>
                        <th className="text-left">Score</th>
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
