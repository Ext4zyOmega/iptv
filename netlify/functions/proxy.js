const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Vérifier si une URL est fournie
    if (!event.queryStringParameters.url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "URL manquante" })
        };
    }

    const url = event.queryStringParameters.url;

    // Vérifier que l'URL provient de fsvid.lol
    if (!url.includes('fsvid.lol')) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "URL non autorisée" })
        };
    }

    try {
        // Récupérer le contenu de la page
        const response = await fetch(url);
        const content = await response.text();

        // Modifier les chemins relatifs en absolus
        const modifiedContent = content
            .replace(/src="\//g, 'src="https://fsvid.lol/')
            .replace(/href="\//g, 'href="https://fsvid.lol/');

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/html'
            },
            body: modifiedContent
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erreur serveur: " + error.message })
        };
    }
}; 