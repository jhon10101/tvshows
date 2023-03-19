$(function() {

    var firstload = true;
    let category = "technology";

    $(document).on('click', '.pagehome', function () {
        firstload = true;
        let templateLoad = '';
        templateLoad += `
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `
        $('#tasks').html(templateLoad);

                $.post('api/tv-data.php', {category}, function (response) {
                    let tvshowsearch = JSON.parse(response);

                    let tasks = JSON.parse(response);
                    template = fetchTasks(tasks);
                    firstload = false;
             
                     $('#tasks').html(template);
                     console.log(tvshowsearch);
                });
    });

    $(document).on('click', '.modalid', function (e) {
        let idmodal = $(this).attr("id");
        template = '';
        let templateLoad = '';
        templateLoad += `
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `
        $('#datostv').html(templateLoad);
       // console.log(idmodal);
       e.preventDefault();
                $.post('api/tv-data-modal.php', {idmodal}, function (response) {
                    let showtv = JSON.parse(response);
                    
              //      let tasks = JSON.parse(response);
            //        template = fetchTasks(tasks);
                  //  tvshowsearch.forEach(showtv =>{

                        imagetv = showtv.image;
                        if((imagetv)){
                            newimage = JSON.stringify(imagetv);
                            newimage = JSON.parse(newimage);
                            newimage = newimage["medium"];
                        }else{
                            newimage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                        }
                        tvcountry = showtv.network;
                        tvwebchannel = showtv.webChannel;
                        idnew = showtv.id;
                        newname = showtv.name;
                        tvlanguage = showtv.language;
                        tvgenres = showtv.genres;
                        tvpremiered = showtv.premiered;
                        tvpremiered = new Date(tvpremiered);
                        tvpremiered = tvpremiered.getFullYear()
                        
                        tvsummary = showtv.summary;
                        if ((tvcountry) == null){
                            tvcountry = "Country: N/A";
                        }else{
                            tvcountry = showtv.network.country.name;
                        }
                        if ((tvwebchannel) == null){
                            tvwebchannel = "";
                        }else{
                            tvwebchannel = showtv.webChannel.name;
                        }

                    template += `
                                <div class="row">
                                    
                                    <div class="col-md-4"><img class="card-img-top" src="${newimage}"></div>
                                
                                    <div class="col-md-7 ml-auto">
                                        <div class="p-1"><h5>${newname}</h5></div>
                                        <span class="badge bg-success"  data-toggle="Status" data-placement="bottom" data-original-title="Tooltip on bottom">${showtv.status}</span>
                                        <p>${tvgenres}</p>
                                        <div>${tvlanguage}</div>
                                        <div>${tvcountry}</div>
                                        <div>${tvpremiered}</div>
                                        <div>${tvwebchannel}</div>
                                    </div>
                                    <div class="">
                                        <div class=""><br>Synopsis: ${tvsummary}</div>
                                    </div>
                                </div>

                        `
                 //   })
                 
                     $('#datostv').html(template);
                   //  console.log(showtv);
                });
       
    });


     $.post('api/tv-data.php', {category}, function (response) {

        
       let tvshowsearch = JSON.parse(response);

       let tasks = JSON.parse(response);
       template = fetchTasks(tasks);
       firstload = false;

        $('#tasks').html(template);
        console.log(tvshowsearch);
        
        
    });

    function fetchTasks(tvshowsearch) {
      //  let tvshowsearch = JSON.parse(tvshowsearch);
        let template = '';
        let imagetv = '';
        let newname = '';
        let x = '';
       // alert(firstload);
      // console.log(tvshowsearch);
        tvshowsearch.forEach(showtv =>{
            idnew = '';
            imagetv = '';
            newname = '';
            if (firstload == true) {
                if((showtv.image) != null){
                    idnew = showtv.id;
                    imagetv = showtv.image;
                    newname = showtv.name;
                }
                
            }else{
                if((showtv.show.image)){
                    idnew = showtv.show.id;
                    imagetv = showtv.show.image;
                    newname = showtv.show.name;
                }else{
                    newimage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                    idnew = showtv.show.id;
                    newname = showtv.show.name;
                }
            }  

           
        if((imagetv)){
            newimage = imagetv.medium;
        }else{
            newimage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
        }
        
            template += `
            <div id="${idnew}" class="btn fade-in-image col-sm-2 p-1 d-flex align-content-start flex-wrap modalid" data-toggle="modal" data-target="#exampleModal">

            <div class="card shadow-lg-primary border-primary h-100">
                        <div class="card-text">
                            <img class="card-img-top" src="${newimage}">
                        </div>
                        <div class="card-body">
                            <div class="card-text">${newname}</div>
                        </div>
                </div>
            </div>
                `

        })
        firstload = false;
        return template;
    }

    $('#search').submit(function(e) {
      //  alert("Hello world");                      
        let keywords = $('#name').val();
        template = '';
        let templateLoad = '';
        templateLoad += `
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `
        $('#tasks').html(templateLoad);

      //  console.log(keywords);
        e.preventDefault();
    
    keywords = $.trim(keywords);
   // console.log(keywords.length);
    if(keywords.length > 0){
        $.post('api/tv-data.php', {keywords}, function(response) {
            
           // $('#temp').html(response);
            document.getElementById("name").focus();
            $('#name').val('');
            let tasks = JSON.parse(response);
            template = fetchTasks(tasks);
                $('#tasks').html(template);
                console.log(tasks);
        });

    }else{
        /*
        $('#ingresar').fadeTo(2000,500).slideUp(500, function(){
            $('#ingresar').slideUp(500);
            document.getElementById("city").focus();
        });
        */
    }

    })


});