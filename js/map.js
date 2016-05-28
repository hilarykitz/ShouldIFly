var width = 960,
    height = 1160;

var projection = d3.geo.albers()
    .center([2.3508, 48.8567])
    .rotate([3.4, 6])
    .parallels([50, 60])
    .scale(4000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/france.json", function(error, fr) {


  svg.selectAll(".subunit")
        .data(topojson.feature(fr, fr.objects.subunits).features)
        .enter().append("path")
        .attr("class", function(d) { return "subunit " + d.id; })
        .attr("d", path);

  svg.append("path")
      .datum(topojson.feature(fr, fr.objects.places))
      .attr("d", path)
      .attr("class", "place");

  svg.selectAll(".place-label")
      .data(topojson.feature(fr, fr.objects.places).features)
      .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.name; });

      for (var i = 0; i < fr.objects.places.geometries.length; i++) {
          if ( fr.objects.places.geometries[i] ) {
                  var c = fr.objects.places.geometries[i].coordinates;
                  var P = fr.objects.places.geometries[i];
                  var pLoc;

                  if (P.properties.name === "Paris") {
                    var pLoc = P;//.coordinates;       
                  }
    
        svg.selectAll(".connects")
              .data(topojson.feature(fr, fr.objects.places).features)
              .enter().append("path")
              .attr("class", "connects")
              .attr("id", function(d) { return d.properties.name; })
              .attr("d", path);

          $(".connects").each(function(){
       
             var p1 = $(this).attr("d").replace(",2a2,2 0 1,1 0,-4a2,2 0 1,1 0,4z","");
             var p2 = $("#Paris").attr("d").replace("M","").replace(",2a2,2 0 1,1 0,-4a2,2 0 1,1 0,4z","");
             var pBoth = p1.concat("," + p2); 

        /*  svg.append("path")
               .attr("class","parisTo")
               .attr("d", pBoth);*/
            });
      }//if
    }//for
  svg.selectAll(".place-label")
      .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
      .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

});//end callback
