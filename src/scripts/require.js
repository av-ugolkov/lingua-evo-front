async function require(url, { method, credentials, headers, body }) {
    let response = await fetch("http://localhost:5000" + url, {
        method: method,
        credentials: credentials,
        headers: headers,
        body: body
    })

    return response
}

export default require;