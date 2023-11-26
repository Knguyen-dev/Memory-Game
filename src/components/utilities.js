// Using Fisher-Yates or Knuff shuffle algorithm
function shuffleArr(arr) {
    const shuffledArr = arr.slice()
    for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = shuffledArr[i]
        shuffledArr[i] = shuffledArr[j]
        shuffledArr[j] = temp
    }
    return shuffledArr
}

// Deep copies an array
function deepCopyArr(arr) {
    return arr.map((obj) => ({ ...obj }))
}

async function badRequest() {
    throw new Error("Not fetching today")
}

export { shuffleArr, deepCopyArr, badRequest }
