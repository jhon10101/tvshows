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

?>