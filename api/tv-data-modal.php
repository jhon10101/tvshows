<?php

            if(isset($_POST["idmodal"])){

                    $search = $_POST["idmodal"];
                    $url = 'https://api.tvmaze.com/shows/'.$search;
                    
                    $queryString = http_build_query([
                       // $search,
                    ]);
            }

                    $ch = curl_init(sprintf('%s?%s', $url, $queryString));
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    
                    $json = curl_exec($ch);
                    
                    curl_close($ch);

                    echo $json;
                 //   $apiResult = json_decode($json, true);
                 //    print_r($apiResult[0]['image']['medium']);
                //  print_r($apiResult['name']);
                 //  print_r($apiResult[0]['show']['image']['medium']);

?>