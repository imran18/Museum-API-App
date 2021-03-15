const apikey = "O7L1wVOQWScP7RzN4lkLYOhyEClQEg00";


function fetchObjects(url) {
    loading(true);
    url = url + "&apikey=" + apikey;
    // ajax call
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
           // console.log(response);
            showObjects(response.data);
            loading(false);
        },
        error: function (response) {
            alert("Error function triggered in AJAX Call");
            console.log(response);
            loading(false);
        },
    });
}

fetchObjects("https://data.nma.gov.au/object?id=*");

function showObjects(data) {
    const len = data.length;
    $("#resultsCount").html("Now showing "+len+" items");
    $("#object-section").html("");
    for (let i = 0; i < len; i++) {
        // console.log(data[i]);
        let img = "./static/images/logo.png";
        if (data[i].hasVersion != undefined || data[i].hasVersion != null) {
            img = data[i].hasVersion[0].hasVersion[0].identifier;
        }
        let description = "No Description Found";
        if(data[i].physicalDescription  != undefined || data[i].physicalDescription  != null){
            description = getShortString(data[i].physicalDescription,70)
        }
        let medium = "No Medium Found";
        if(data[i].medium  != undefined || data[i].medium  != null){
            medium = data[i].medium[0].title +" - "+ data[i].medium[0].type; 
        }
        let collection = "No Collection Found";
        if(data[i].collection  != undefined || data[i].collection  != null){
            collection = data[i].collection.title; 
        }
        let contributer = "No Contributor Found";
        if(data[i].contributor  != undefined || data[i].contributor  != null){
            contributer = data[i].contributor[0].title +" - "+data[i].contributor[0].roleName; 
        }
        let objHTML = '<div class="col-lg-4 my-2">' +
            '                <div class="card">' +
            '                    <div class="card-header">' +
            '                        <h5 class="card-title">' + getShortString(data[i].title,30) + '</h5>' +
            '                    </div>' +
            '                    <div class="card-body">' +
            '                        <p class="card-text">' +
            '                           <img src="' + img + '" width="100%" height="200px" style="object-fit:cover" /> ' +
            '                        </p>' +
            '                          <p class="card-text">' +
            '                          <b>Description:</b>  '+description +
            '                           <br>'+
            '                          <b>Medium:</b>  '+medium +
            '                           <br>'+
            '                          <b>Collection:</b>  '+collection+
            '                           <br>'+
            '                          <b>Contributer:</b>  '+contributer+
            '                        </p>' +
            '                    </div>' +
            '                    <div class="card-footer">' +
            '                        <button class="btn btn-success" onclick="openObjectDetailPage(`'+data[i].title+'`)">View More</button>' +
            '                       <small class="text-muted float-right">'+data[i]._meta.issued+'</small>' +
            '                    </div>' +
            '                </div>' +
            '            </div>';
        $("#object-section").append(objHTML);
    }
}

function getShortString(str, len) {
    if (str.length > len) {
        return str.substring(0, len) + " ....";
    } else {
        return str;
    }
}

function openObjectDetailPage(title){
    localStorage.setItem("clickedObjectTitle",title);
    window.location.replace("objectDetail.html");
}

function applyFilters(){
    const filterText = $("#filterText").val();
    const filterTitle = $("#filterTitle").val();
    const filterDescription = $("#filterDescription").val();
    const filterTemporal = $("#filterTemporal").val();
    const filterLocation = $("#filterLocation").val();

    loading(true);
    url = "https://data.nma.gov.au/object?id=*";
    url += "&apikey=" + apikey;
    url += "&title=" + filterTitle;
    url += "&description=" + filterDescription;
    url += "&temporal=" + filterTemporal;
    url += "&location=" + filterLocation;
    url += "&text=" + filterText;
    // ajax call
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            console.log(response);
            showObjects(response.data);
            loading(false);
            // document.getElementById('resultsCount').scrollIntoView();
        },
        error: function (response) {
            alert("Error function triggered in AJAX Call");
            console.log(response);
            loading(false);
        },
    });
}