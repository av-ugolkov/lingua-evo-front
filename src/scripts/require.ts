async function require(url: string, init?: RequestInit, queries?: Map<string, string>): Promise<Response> {
    let fullUrl = new URL("http://localhost:5000" + url)
    if (queries) {
        queries.forEach((value, key) => {
            fullUrl.searchParams.append(key, value)
        })
    }
    let response = await fetch(fullUrl, init)

    return response
}

export default require;