const apiKey = 'pk.eyJ1IjoiaW53ZGQ3Mzg4IiwiYSI6ImNrb2pzbWFtdDA1am8yb2t6amlyODQ1cWsifQ.4erRleursilPgiovfdxL9g'

//Map 1 (Leaflet)
var leafletmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    minZoom: 2,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey,
});


//Map 2 (osm)
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 2,
});

//Map 3 (Google Static)
var googlestreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 19,
    minZoom: 2,
    subdomains:['mt0','mt1','mt2','mt3']
});

//Map 4 (Google Hybrid)
var googlehybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 19,
    minZoom: 2,
    subdomains:['mt0','mt1','mt2','mt3']
});

    
// Adding Icons
var circleIcon = L.icon ({
    className: 'icon1',
    iconUrl : 'lib/icon_circle2.png',
    shadowUrl: 'lib/icon_circle.png',
    iconSize : [20, 20],
    shadowSize: [20, 20],
    iconAnchor : [10, 9.5],
    popupAnchor : [0, 42]
})

var MCIcon = L.icon ({
    iconUrl : 'lib/icon_MC2.png',
    shadowUrl: 'lib/icon_MC.png',
    iconSize : [20, 20],
    shadowSize: [20, 20],
    iconAnchor : [10, 9.5],
    popupAnchor : [0, 42]
})

var RCIcon = L.icon ({
    iconUrl : 'lib/icon_RC2.png',
    shadowUrl: 'lib/icon_RC.png',
    iconSize : [20, 20],
    shadowSize: [20, 20],
    iconAnchor : [10, 9.5],
    popupAnchor : [0, 42]
})

var StarIcon = L.icon ({
    iconUrl : 'lib/icon_star2.png',
    shadowUrl: 'lib/icon_star.png',
    iconSize : [20, 20],
    shadowSize: [20, 20],
    iconAnchor : [10, 9.5],
    popupAnchor : [0, 42]
})

var selected_map = $('#maps').val();
var parameters = window.location.href.split('.html')[1];

selected_map= 'googlehybrid';
if(parameters){
    var selected_map = parameters.split('maps=')
    if(selected_map[1]){
        selected_map = selected_map[1].split('&')[0]
    }
}


if(selected_map=='googlehybrid'){
    var map = L.map('map', {doubleClickZoom: false}).addLayer(googlehybrid).setView([7.55068, 39.133300], 5);
} else if(selected_map=='googlestreets'){
    var map = L.map('map', {doubleClickZoom: false}).addLayer(googlestreets).setView([7.55068, 39.133300], 5);
} else{
    var map = L.map('map', {doubleClickZoom: false}).addLayer(osm).setView([7.55068, 39.133300], 5);
}


function filterMap(){
    var promise = $.getJSON("map.json");

    var selected_countries = [];
    $('input[name="country[]"]:checked').each(function() {
       selected_countries.push(this.value);
    });

    if(!selected_countries){
        selected_countries = [];
    }


    var selected_activities = [];
    $('input[name="activities[]"]:checked').each(function(){
        selected_activities.push(this.value);
    });
    if(!selected_activities){
        selected_activities = [];
    }


    var selected_partners = [];
    $('input[name="partners[]"]:checked').each(function(){
        selected_partners.push(this.value);
    });
    if(!selected_partners){
        selected_partners = [];
    }

    var static_country_names = [{ 'sudan': 'gadarief,galabat,hamdayet,jodah,whitenile'},{'southsudan': 'juba,maban,nadapal,nimule,renk' },{'uganda':'elegu,adjumani,malaba,busia'},{'kenya': 'turkana,marsabit,garissa,mandera,daadab,diif'},{'ethiopia':'metema,semera,gambela,togwajale,moyale,hawli'},{'somalia':'belethawa,diif2,dhoblei,baidoa,mogadishu,wajale,bosasso'},{'djibouti':'alisabieh,galafi,dora,djiboutiport,obock,obock2'}]
    var company_names = [];
    for(let i=0; i<static_country_names.length; i++){
        Object.keys(static_country_names[i]).forEach(function(key) {

            if(selected_countries[0]=='all'){
                var value = static_country_names[i][key];
                company_names.push(value)
            } else if(selected_countries.indexOf(key)>-1){
                var value = static_country_names[i][key];
                company_names.push(value)
            }

        });

    }

    var company_names = company_names.toString().split(',');

    promise.then(function(data) {
        var all_locations = L.geoJson(data);

        for (var i = 0; i < selected_countries.length; i++) {
            var countries = L.geoJson(data, {
                filter: function(feature, layer) {
                    if(selected_countries[0]=='all'){
                        return feature.properties.type == "country";
                    } else{
                        return feature.properties.type == "country" && feature.properties.country==selected_countries[i];
                    }                    
                },
                pointToLayer: function(feature, latlng) {
                    if(feature.properties.icon=='circleIcon'){
                        return L.marker(latlng, { icon: circleIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else if(feature.properties.icon=='MCIcon'){
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else if(feature.properties.icon=='RCIcon'){
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else {
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    }
                }
            });

            countries.addTo(map)
        }


        for (var i = 0; i < selected_activities.length; i++) {
            var activities = L.geoJson(data, {
                filter: function(feature, layer) {

                    if(selected_activities[0]=='all'){
                        if(company_names.indexOf(feature.properties.Name)>1){
                            return feature.properties.type == "activity";
                        }
                    } else{
                        if(company_names.indexOf(feature.properties.Name)>1){
                            return feature.properties.type == "activity" && feature.properties.activity==selected_activities[i];
                        }
                    }
                },
                pointToLayer: function(feature, latlng) {
                    if(feature.properties.icon=='circleIcon'){
                        return L.marker(latlng, { icon: circleIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else if(feature.properties.icon=='MCIcon'){
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else if(feature.properties.icon=='RCIcon'){
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else {
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    }
                }
            });

            activities.addTo(map)
                
        }


        for (var i = 0; i < selected_partners.length; i++) {
            var partners = L.geoJson(data, {
                filter: function(feature, layer) {
                    if(selected_partners[0]=='all'){
                        if(company_names.indexOf(feature.properties.Name)>1){
                            return feature.properties.type == "partner";
                        }
                    } else{     
                        if(company_names.indexOf(feature.properties.Name)>1){                   
                            return feature.properties.type == "partner" && feature.properties.partner==selected_partners[i];
                        }
                    }
                },
                pointToLayer: function(feature, latlng) {
                    if(feature.properties.icon=='circleIcon'){
                        return L.marker(latlng, { icon: circleIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else if(feature.properties.icon=='MCIcon'){
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else if(feature.properties.icon=='RCIcon'){
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    } else {
                        return L.marker(latlng, { icon: MCIcon }).on('mouseover', function() {
                            this.bindPopup('<img height="50px" src="'+feature.properties.popup_img+'">', {autoClose: false, closeOnClick: false});
                        });
                    }
                }
            });


            partners.addTo(map)
        }


        map.fitBounds(all_locations.getBounds(), {
            padding: [50, 50]
        });



       
        if ($('#polygon').is(":checked")) {
            var latlngs = [[20.000066, 24.000162],[8.706755, 35.529665],[7.325975, 43.020540],[1.678135, 38.478610]];
            var polygon = L.polygon(latlngs, {color: 'blue'}).addTo(map);
            // zoom the map to the polygon
            //map.fitBounds(polygon.getBounds());
        }
        

        if ($('#polyygon').is(":checked")) {
             var secondPolygonData = L.geoJSON(polyygon, {
                color: 'white',
                opacity: 0.5,
                fillColor: 'null',
                fillOpacity: 0.15,
                dashArray: '5, 3, 2',
            }).addTo(map);
            //map.fitBounds(secondPolygonData.getBounds());
        }

        if(partners){
            map.addLayer(partners)
        }
        
        if(activities){
            map.addLayer(activities)
        }
        
        if(countries){
            map.addLayer(countries)
        }


        L.control.fullscreen({
          position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
          title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
          titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
          content: null, // change the content of the button, can be HTML, default null
          forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
          forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
          fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
        }).addTo(map);

        // events are fired when entering or exiting fullscreen.
        map.on('enterFullscreen', function(){
          console.log('entered fullscreen');
        });

        map.on('exitFullscreen', function(){
          console.log('exited fullscreen');
        });

        L.control.measure({
            position: 'topleft'
        }).addTo(map)
    });
}


$(function(){
    var parameters = window.location.href.split('.html')[1];

    selected_countries= 'all';
    selected_activities= 'all';
    selected_partners= 'all';
    selected_map= 'googlehybrid';
    checked_polygon='false';
    checked_polyygon='true';

    if(parameters){
        var selected_countries = parameters.split('countries=')
        if(selected_countries[1]){
            selected_countries = selected_countries[1].split('&')[0]
        }

        var selected_map = parameters.split('maps=')
        if(selected_map[1]){
            selected_map = selected_map[1].split('&')[0]
        }


        var selected_activities = parameters.split('activities=')
        if(selected_activities[1]){
            selected_activities = selected_activities[1].split('&')[0]
        }

        var checked_polygon = parameters.split('polygon=')
        if(checked_polygon[1]){
            checked_polygon = checked_polygon[1].split('&')[0];
            if(checked_polygon=='true'){
                $('[name=polygon]').prop('checked', true)
            }
        }


        var checked_polyygon = parameters.split('polyygon=')
        if(checked_polyygon[1]){
            checked_polyygon = checked_polyygon[1].split('&')[0];
            if(checked_polyygon=='true'){
                $('[name=polyygon]').prop('checked', true)
            }
        }


        var selected_partners = parameters.split('partners=')
        if(selected_partners[0]){
            selected_partners = selected_partners[1].split('=')[0]
        }


        
    }

    var countries = [
    { "value": "all", "html": "All"}, 
    { "value": "sudan", "html": "Sudan"}, 
    { "value": "southsudan", "html": "South Sudan"}, 
    { "value": "uganda", "html": "Uganda"}, 
    { "value": "kenya", "html": "Kenya"}, 
    { "value": "somalia", "html": "Somalia"}, 
    { "value": "ethiopia", "html": "Ethiopia"}, 
    { "value": "djibouti", "html": "Djibouti"}]

    for(let i=0; i<countries.length; i++){
        if(selected_countries.split(',').indexOf(countries[i].value)>-1){
            $('#country').append(`<li><input type="checkbox" id="country_${i}" name="country[]" value="${countries[i].value}" checked onclick="filterMapValues()"> <label for="country_${i}"> ${countries[i].html}</li>`);
        } else{
            $('#country').append(`<li><input type="checkbox" id="country_${i}"name="country[]"  value="${countries[i].value}" onclick="filterMapValues()"> <label for="country_${i}"> ${countries[i].html}</li>`);
        }
        
    }
    
    var activities =[
    {"value": "all","html":"All"},
    {"value":"Health", "html":"Health"},
    {"value":"WASH","html":"WASH"},
    {"value":"GBV","html":"GBV"},
    {"value":"RCCE","html":"RCCE"},
    {"value":"PPE","html":"PPE"},
    {"value":"Testing","html":"Testing"},
    {"value":"Ambulances","html":"Ambulances"},
    {"value":"Trade","html":"Trade"},
    {"value":"Facilities","html":"Facilities"}]

     for(let i=0; i<activities.length; i++){
        if(selected_activities.indexOf(activities[i].value)>-1){
            $('#activities').append(`<li><input type="checkbox" id="activities_${i}" name="activities[]" value="${activities[i].value}" checked onclick="filterMapValues()"> <label for="activities_${i}"> ${activities[i].html}</li>`);
        } else{
            $('#activities').append(`<li><input type="checkbox" id="activities_${i}" name="activities[]" value="${activities[i].value}" onclick="filterMapValues()"> <label for="activities_${i}"> ${activities[i].html}</li>`);
        }
        
    }
                                                                             
    var partners =[
        {"value": "all","html":"All"},
        {"value":"UNOPS", "html":"UNOPS"},
        {"value":"UNICEF","html":"UNICEF"},
        {"value":"IOM","html":"IOM"},
        {"value":"TMEA","html":"TMEA"}]
    
    for(let i=0; i<partners.length; i++){
        if(selected_partners.indexOf(partners[i].value)>-1){
            $('#partners').append(`<li><input type="checkbox" id="partner_${i}" name="partners[]" value="${partners[i].value}" checked onclick="filterMapValues()"> <label for="partner_${i}">${partners[i].html}</label></li>`);
        } else{
            $('#partners').append(`<li><input type="checkbox" id="partner_${i}" name="partners[]" value="${partners[i].value}" onclick="filterMapValues()"> <label for="partner_${i}">${partners[i].html}</label></li>`);
        }
    }

    if(selected_map=='googlehybrid'){
        $('#maps').append('<li> <input type="radio" name="map" id="googlehybrid" value="googlehybrid" checked onclick="filterMapValues()"> <label for="googlehybrid">Google Hybrid</label></li>')
        $('#maps').append('<li> <input type="radio" name="map" id="googlestreets" value="googlestreets" onclick="filterMapValues()"> <label for="googlestreets">Google Streets</label></li>')
        $('#maps').append('<li> <input type="radio" name="map" id="osm" value="osm" onclick="filterMapValues()"> <label for="osm">Open Street Map</label></li>')
    } else if(selected_map=='googlestreets'){
        $('#maps').append('<li> <input type="radio" name="map" id="googlehybrid" value="googlehybrid"  onclick="filterMapValues()"> <label for="googlehybrid">Google Hybrid</label></li>')
        $('#maps').append('<li> <input type="radio" name="map" id="googlestreets" value="googlestreets" checked onclick="filterMapValues()"> <label for="googlestreets">Google Streets</label></li>')
        $('#maps').append('<li> <input type="radio" name="map" id="osm" value="osm" onclick="filterMapValues()"> <label for="osm">Open Street Map</label></li>')
    } else{
        $('#maps').append('<li> <input type="radio" name="map" id="googlehybrid" value="googlehybrid" onclick="filterMapValues()"> <label for="googlehybrid">Google Hybrid</label></li>')
        $('#maps').append('<li> <input type="radio" name="map" id="googlestreets" value="googlestreets" onclick="filterMapValues()"> <label for="googlestreets">Google Streets</label></li>')
        $('#maps').append('<li> <input type="radio" name="map" id="osm" value="osm" checked onclick="filterMapValues()"> <label for="osm">Open Street Map</label></li>')
    }
    

    /*$("#country").multiselect({
        columns: 1,
        placeholder: 'Select Country'
    });*/

    $("select[name=activities]").multiselect({
        columns: 1,
        placeholder: 'Select Activities'
    });
        
    $("select[name=partners]").multiselect({
        columns: 1,
        placeholder: 'Select Partners'
    });

    if(checked_polygon=='true'){
        $('#polygon').prop('checked', true)
    }

    if(checked_polyygon=='true'){
        $('#polyygon').prop('checked', true)
    }


    filterMap()
})


 function filterMapValues(){

        var countries = [];
        $('input[name="country[]"]:checked').each(function() {
            countries.push(this.value)
        })


        var activities = [];
        $('input[name="activities[]"]:checked').each(function(){
            activities.push(this.value)
        })
        // var selectedActivity = document.getElementById("activities").selectedOptions;
        // var activities = Array.from(selectedActivity).map(({ value }) => value);

        var partners=[];
        $('input[name="partners[]"]:checked').each(function(){
            partners.push(this.value)
        })
    
        var checked_polygon = $('#polygon:checked').length;

        if (checked_polygon == true){
            checked_polygon = 'true';
        } else {
            checked_polygon = 'false';
        }



       var checked_polyygon = $('#polyygon:checked').length;

        if (checked_polyygon == true){
            checked_polyygon = 'true';
        } else {
            checked_polyygon = 'false';
        }   




        var maps =  $('#maps [type="radio"]:checked').val()
        var redirect_to=window.location.href.split('.html')[0]+'.html?countries='+countries+'&activities='+activities+'&maps='+maps+'&polygon='+checked_polygon+'&polyygon='+checked_polyygon+'&partners='+partners;
        window.location=redirect_to;
}


// Adding Legend

var legend = L.control({position: 'bottomleft',});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        labels = ["lib/xlegend.png"];
 {
        div.innerHTML +=
            " <img src="+ labels +" height='74' width='350'>";
    }

    return div;
};

legend.addTo(map);





// Adding Scale to Map

L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft',

}).addTo(map);



// GenerateList Functions (LEFT COLUMN)

function generateList() {
    var ul = document.querySelector('.list');
    projectSites.forEach((site) => {
        var li = document.createElement('li');
        var div = document.createElement('div');
        var a = document.createElement('a');
        var p = document.createElement('p'); 
        var flag = document.createElement('flag');
        
        a.addEventListener('click', () => {
            flyToSite(site);
        })

        div.classList.add('project-item');        

        a.innerText = site.properties.name + ' ';
        a.href = '#'
        p.innerHTML = site.properties.info;
        flag.innerHTML = site.properties.countryflag;

        div.appendChild(flag);
        div.appendChild(a);
        div.appendChild(p);
        
        li.appendChild(div);
        ul.appendChild(li);
    })
}

generateList();


// Doing BindPopups

function makePopupContent(site){
    return `
    <div class ="boxcontentt">
        <img height ="50px" src="${site.properties.boxcontent}">
    </div>
    `;
}

function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature), {autoClose: false, closeOnClick: false});
}


 // Putting in Sites

var sitesLayer = L.geoJSON(projectSites, {
    onEachFeature: onEachFeature, 
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: null});
    }
});

sitesLayer.addTo(map);



// Adding Flying Animation

function flyToSite (site) {

    var latt = site.geometry.coordinates[1];
    var lngg = site.geometry.coordinates[0];
    map.flyTo([latt, lngg], 8,{
        duration: 4
    });

    setTimeout(() => {

        L.popup({autoClose: true, closeOnClick: false,})
        .setLatLng([latt, lngg])
        .setContent(makePopupContent(site))
        .openOn(map);

    }, 3000);

}

L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft',

}).addTo(map);


// Adding Empty Circle (placeholder)

var emptycircle = L.circle(
    [0, 0], 0,
    {
        color: 'red',
        fillColor: 'red',
        opacity: 0,
        fillOpacity: 0,
    }
);

