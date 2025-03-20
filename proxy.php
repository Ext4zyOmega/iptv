<?php
// Activer l'affichage des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Headers nécessaires
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');

// Vérifier si une URL est fournie
if (!isset($_GET['url'])) {
    die("Erreur : Aucune URL fournie");
}

$url = $_GET['url'];
echo "URL reçue : " . $url . "<br>";

// Vérifier si c'est une URL de fsvid.lol
if (strpos($url, 'fsvid.lol') === false) {
    die("Erreur : URL non autorisée");
}

// Initialiser cURL
$ch = curl_init();

// Configurer cURL
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

// Exécuter la requête
$content = curl_exec($ch);

// Vérifier s'il y a des erreurs
if (curl_errno($ch)) {
    echo "Erreur cURL : " . curl_error($ch) . "<br>";
    die();
}

// Obtenir les informations sur la requête
$info = curl_getinfo($ch);
echo "Code HTTP : " . $info['http_code'] . "<br>";
echo "Type de contenu : " . $info['content_type'] . "<br>";
echo "Taille du contenu : " . strlen($content) . " octets<br>";

// Fermer cURL
curl_close($ch);

// Afficher le contenu
echo "Contenu de la page :<br><pre>";
echo htmlspecialchars(substr($content, 0, 1000));
echo "</pre>";
?> 