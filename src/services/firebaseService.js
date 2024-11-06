// src/services/firebaseService.js
import { app } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import { getDatabase } from "firebase/database";

export async function checkUserLibrary(accountId) {
    try {
        const db = getDatabase(app); // Initialize db within the function
        const userRef = ref(db, `users/${accountId}`);
        const userSnapshot = await get(userRef);
        return userSnapshot.exists() ? userSnapshot.val() : null;
    } catch (error) {
        console.error("Error fetching user library:", error);
        throw new Error("Error fetching user library");
    }
}

export async function fetchRecommendations(accountId) {
    try {
        const db = getDatabase(app); // Initialize db within the function
        const recommendRef = ref(db, `recommend/${accountId}`);
        const recommendSnapshot = await get(recommendRef);
        return recommendSnapshot.exists() ? recommendSnapshot.val() : [];
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw new Error("Error fetching recommendations");
    }
}

export async function fetchRecommendationsWithGameData(accountId) {
    const db = getDatabase(app);
    const recommendationsRef = ref(db, `recommend/${accountId}`);

    try {
        const recommendationsSnapshot = await get(recommendationsRef);
        if (!recommendationsSnapshot.exists()) {
            return [];
        }

        const recommendationsData = recommendationsSnapshot.val();
        const gameKeys = Object.keys(recommendationsData);

        // Fetch all game data in parallel using Promise.all
        const gameDataPromises = gameKeys.map(async (key) => {
            const gameRef = ref(db, `games/${key}`);
            const gameSnapshot = await get(gameRef);

            if (gameSnapshot.exists()) {
                return {
                    key,
                    predicted_rating: recommendationsData[key], // Original predicted rating from recommendation
                    ...gameSnapshot.val() // Add the rest of the game data
                };
            } else {
                return null; // Handle case where game data is missing
            }
        });

        // Resolve all promises and filter out any null results
        const gameDataList = await Promise.all(gameDataPromises);
        return gameDataList.filter((gameData) => gameData !== null);
    } catch (error) {
        console.error("Error fetching recommendation and game data:", error);
        throw new Error("Error fetching recommendation data");
    }
}


export async function fetchLibraryWithGameData(accountId) {
    const db = getDatabase(app);
    const libraryRef = ref(db, `users/${accountId}`);

    try {
        const librarySnapshot = await get(libraryRef);
        if (!librarySnapshot.exists()) {
            return [];
        }

        const libraryData = librarySnapshot.val();
        const gameKeys = Object.keys(libraryData);

        // Fetch all game data in parallel using Promise.all
        const gameDataPromises = gameKeys.map(async (key) => {
            const gameRef = ref(db, `games/${key}`);
            const gameSnapshot = await get(gameRef);

            if (gameSnapshot.exists()) {
                const gameData = gameSnapshot.val();
                return {
                    key,
                    app_name: gameData.app_name,
                    weighted_rating: libraryData[key] // Use "weighted_rating" from library data
                };
            } else {
                return null; // Handle case where game data is missing
            }
        });

        // Resolve all promises and filter out any null results
        const gameDataList = await Promise.all(gameDataPromises);
        return gameDataList.filter((gameData) => gameData !== null);
    } catch (error) {
        console.error("Error fetching library and game data:", error);
        throw new Error("Error fetching library data");
    }
}

