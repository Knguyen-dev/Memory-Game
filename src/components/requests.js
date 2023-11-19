/*


*/
function processGames(gameList) {
    gameList = gameList.map((gameObj) => {
        return {
            id: gameObj.id,
            name: gameObj.name,
            released: gameObj.released,
            background_image: gameObj.background_image,
            metacritic: gameObj.metacritic,
        }
    })
    return gameList
}

function fetchGames(pageNumber, pageSize) {
    const apiKey = "79e2d19924d040afa2644aa5867a40f4"
    const baseURL = "https://api.rawg.io/api/games"
    const requestURL = `${baseURL}?key=${apiKey}&page=${pageNumber}&page_size=${pageSize}`
    return fetch(requestURL, {
        mode: "cors",
    })
        .then((response) => {
            if (!response.ok) {
                throw response
            }
            return response.json()
        })
        .then((jsonData) => {
            const gameList = processGames(jsonData.results)
            return gameList
        })
        .catch((error) => {
            console.error("Error in fetching the games: ", error)
            throw error
        })
}

/*
- Gets a random list of games: 


    
NOTE: We're querying from all games with no parameters so we should get
    access to all games on the database. Rawg is stated to have more than 350,000
    games, and as of writing the amount was 859,300 indicated by a GET request.
    However, to be fun and get more recent and recognizable games, we'll limit the 
    count to 10,000 games, which greatly reduces the amount of pages in the page range.

*/
async function getGames(pageSize) {
    const gameCount = 10000
    const upperPageLimit = Math.floor(gameCount / pageSize)
    const randomPageNum = Math.floor(Math.random() * upperPageLimit) + 1
    try {
        const gameList = await fetchGames(randomPageNum, pageSize)
        return gameList
    } catch (error) {
        console.log("Error in getting games: ", error)
        throw error
    }
}

function fetchGifURL(searchTerm) {
    // Create the request URL
    const apiKey = "NEs7tmX6Z6Up0BlOyfGtmFbMHoe2fTKh" // free api key
    const baseURL = `https://api.giphy.com/v1/gifs/translate?`
    const requestURL = `${baseURL}api_key=${apiKey}&s=${searchTerm}`

    // Fetch the gif
    return fetch(requestURL, {
        mode: "cors",
    })
        .then((response) => {
            if (!response.ok) {
                throw response
            }
            return response.json()
        })
        .then((jsonData) => {
            return jsonData.data.images.original.url
        })
        .catch((error) => {
            console.error("Error fetching the gif: ", error)
            throw error // throws error further if needed
        })
}

export { getGames, fetchGifURL }
