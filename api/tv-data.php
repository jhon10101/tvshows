<?php

            if(isset($_POST["keywords"])){

                    $search = $_POST["keywords"];
                    $url = 'https://api.tvmaze.com/search/shows';
                    $queryString = http_build_query([
                        'q' => $search,
                    ]);

            }else{

                   $search = 'Show%5BshowStatus_enum%5D=&Show%5BshowType_enum%5D=1&Show%5Bgenre%5D=&Show%5Blanguage_enum%5D=&Show%5Bcountry_enum%5D=&Show%5Bnetwork_id%5D=&Show%5BwebChannel_id%5D=&Show%5Bruntime%5D=&Show%5Brating%5D=&Show%5Bsort%5D=9';
                   $url = 'https://api.tvmaze.com/shows';
                   $queryString = http_build_query([
                        $search,
                    ]);
            }


                    $ch = curl_init(sprintf('%s?%s', $url, $queryString));
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    
                    $json = curl_exec($ch);
                    
                    curl_close($ch);

                    echo $json;

?>