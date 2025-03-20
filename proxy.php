<?php
// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Headers de base
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');

// Log pour débug
error_log("Proxy appelé à " . date('Y-m-d H:i:s'));

// Vérifier si une URL est fournie
if (!isset($_GET['url'])) {
    die("Erreur : Aucune URL fournie");
}

$url = $_GET['url'];
error_log("URL reçue : " . $url);

// Vérifier si c'est une URL de fsvid.lol
if (strpos($url, 'fsvid.lol') === false) {
    die("Erreur : URL non autorisée");
}

// Essayer de récupérer le contenu
try {
    $content = file_get_contents($url);
    if ($content === false) {
        error_log("Erreur lors de la récupération du contenu");
        die("Erreur de récupération du contenu");
    }
    error_log("Contenu récupéré avec succès");
    echo $content;
} catch (Exception $e) {
    error_log("Exception : " . $e->getMessage());
    die("Erreur : " . $e->getMessage());
}
?> 