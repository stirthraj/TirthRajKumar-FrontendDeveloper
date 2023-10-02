<?php

require 'vendor/autoload.php'; // Include the Composer autoloader

use Firebase\JWT\JWT;

$key = '1234'; // Replace with your secret key
$username = 'password1'; // Replace with the authenticated user's username
$token = [
    'user1' => $username,
    'exp' => time() + 3600*24, // Token expiration time (1 hour)
];
$jwt = JWT::encode($token, $key,'HS256');

echo $jwt;
