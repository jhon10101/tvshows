$(function() {

    var firstload = true;
    let category = "tech";

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

                     fetchPagination();
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

       e.preventDefault();
                $.post('api/tv-data-modal.php', {idmodal}, function (response) {
                    let showtv = JSON.parse(response);

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

                });
       
    });


     $.post('api/tv-data.php', {category}, function (response) {

        
       let tvshowsearch = JSON.parse(response);

       let tasks = JSON.parse(response);
       template = fetchTasks(tasks);
       firstload = false;

        $('#tasks').html(template);
        
      fetchPagination();

    });

    function fetchTasks(tvshowsearch) {

        let template = '';
        let imagetv = '';
        let newname = '';
        let x = '';

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
           
            <div class="d-flex "> 
                <div id="${idnew}" class="card btn fade-in-image col-md-11 col-12 p-1 m-1 shadow-lg-primary align-content-start  border-primary modalid" data-toggle="modal" data-target="#exampleModal">
                    <div class="flex-wrap ">    
                            <img class="card-img-top" src="${newimage}">
                        
                        <div class="card-body">
                            <div class="card-text">${newname}</div>
                        </div>
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
              //  console.log(tasks);
              fetchPagination();
        });

    }else{

    }

    })
    function fetchPagination() {
        var numberOfItems = $(".card-content .card").length;
        var limitPerPage = 8; //How many card items visible per a page
        var totalPages = Math.ceil(numberOfItems / limitPerPage);
        var paginationSize = 5; //How many page elements visible in the pagination
        var currentPage;
      
        function showPage(whichPage){
          if(whichPage < 1 || whichPage > totalPages) return false;
      
          currentPage = whichPage;
      
          $(".card-content .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
      
          $(".pagination li").slice(1, -1).remove();
      
          getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
            .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
            .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
          });
      
          $(".previous-page").toggleClass("disable", currentPage === 1);
          $(".next-page").toggleClass("disable", currentPage === totalPages);
          return true;
        }
      
        $(".pagination").append(
          $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),
          $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Next"))
        );
      
        $(".card-content").show();
        showPage(1);
      
        $(document).on("click", ".pagination li.current-page:not(.active)", function(){
          return showPage(+$(this).text());
        });
      
        $(".next-page").on("click", function(){
          return showPage(currentPage + 1);
        });
      
        $(".previous-page").on("click", function(){
          return showPage(currentPage - 1);
        });
              
    }


    function getPageList(totalPages, page, maxLength){
        function range(start, end){
          return Array.from(Array(end - start + 1), (_, i) => i + start);
        }
      
        var sideWidth = maxLength < 9 ? 1 : 2;
        var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
        var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
      
        if(totalPages <= maxLength){
          return range(1, totalPages);
        }
      
        if(page <= maxLength - sideWidth - 1 - rightWidth){
          return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
        }
      
        if(page >= totalPages - sideWidth - 1 - rightWidth){
          return range(1, sideWidth).concat(0, range(totalPages- sideWidth - 1 - rightWidth - leftWidth, totalPages));
        }
      
        return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
      }

    // Go to Top
    $(function(){
        // Scroll Event
        $(window).on('scroll', function(){
            var scrolled = $(window).scrollTop();
            if (scrolled > 600) $('.go-top').addClass('active');
            if (scrolled < 600) $('.go-top').removeClass('active');
        });  
        // Click Event
        $('.go-top').on('click', function() {
            $("html, body").animate({ scrollTop: "0" },  500);
        });
    });


});