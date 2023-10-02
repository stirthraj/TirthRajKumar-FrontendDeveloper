<?php
 function callAPI($method, $url, $data){
$ch = curl_init($url);
 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);
curl_close($ch);
$response = json_decode($data,true);
return json_encode($response);
 }

 $get_data = callAPI('GET','https://api.spacexdata.com/v4/capsules', false);

 echo $get_data;

?>
