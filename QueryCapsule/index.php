<?php
require '../vendor/autoload.php'; // Include the Composer autoloader
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 360000");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Authorization, X-Requested-With");
header("content-type: application/json");

if(strtoupper($_SERVER["REQUEST_METHOD"]) == "OPTIONS"){
    echo json_encode([]);
    exit;
}

class AuthAPI {
    private $key = '1234'; // Replace with your secret key
    private $users = [
        'user1' => 'password1',
    ];

    public function run() {
        $request_method = $_SERVER['REQUEST_METHOD'];
        $request_uri = $_SERVER['REQUEST_URI'];

        // Check if the request is authorized
        if (!$this->isAuthorized()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            return;
        }
        switch ($request_method) {
           
            case 'POST':
                if ($request_uri === '/bsf/QueryCapsule/') {
                    $data = $this->getData('https://api.spacexdata.com/v4/capsules/query');
                    echo json_encode(['data' => $data]);
                }
                 else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Not Found']);
                }
                break;
            default:
                http_response_code(405);
                echo json_encode(['error' => 'Method Not Allowed']);
        }
    }

    private function isAuthorized() {
        if (isset($_SERVER['HTTP_X_AUTHORIZATION'])) {
            $token = str_replace('Bearer ', '', $_SERVER['HTTP_X_AUTHORIZATION']);
            return $this->verifyToken($token);
        }
        return false;
    }

    private function verifyToken($token) {
        try {
            $keyy='1234';
            $decoded = JWT::decode($token, new Key($keyy, 'HS256'));
            $decoded_array = (array) $decoded;
            return $this->users['user1']===$decoded_array['user1'];
        } catch (Exception $e) {
            return false;
        }
    }

    private function getData($url) {
        // Implement your data retrieval logic here
        $ch = curl_init($url);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "Accept: application/json",
   "Content-Type: application/json",
);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$entityBody = file_get_contents('php://input');
echo $entityBody;
$data = json_decode(file_get_contents('php://input'), true);
echo print_r($data);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($entityBody));
$resp = curl_exec($ch);
curl_close($ch);
$resp=json_decode($resp,true);

return $resp;

    }
}

$api = new AuthAPI();
$api->run();
