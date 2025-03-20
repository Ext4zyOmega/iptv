const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const url = event.queryStringParameters.url;
        
        if (!url || !url.includes('fsvid.lol')) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'URL invalide' })
            };
        }

        const response = await fetch(url);
        const content = await response.text();

        // Convertir les chemins relatifs en absolus
        const modifiedContent = content.replace(/src="\//g, 'src="https://fsvid.lol/');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*'
            },
            body: modifiedContent
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}; 