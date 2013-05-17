var TREK_LAYER_OPTIONS = L.Util.extend({
    style: {'color': '#F89406', 'weight': 5, 'opacity': 0.8},
    hoverstyle: {'color': '#F89406', 'weight': 5, 'opacity': 1.0},
    outlinestyle: {'color': 'yellow', 'weight': 10, 'opacity': 0.8},
    arrowstyle: {'fill': '#E97000', 'font-weight': 'bold'},
    positionstyle: {'fillOpacity': 1.0, 'opacity': 1.0, 'fillColor': 'white', 'color': 'black', 'width': 3}
}, TREK_LAYER_OPTIONS || {});


function invalidate_maps() {
    if (window.maps) {
        $.each(window.maps, function (i, map) {
            map.invalidateSize();
        });
    }
}


var TrekLayer = L.ObjectsLayer.extend({

    initialize: function (geojson) {
        var options = $.extend({
                highlight: true
            },
            TREK_LAYER_OPTIONS
        );
        L.ObjectsLayer.prototype.initialize.call(this, geojson, options);

        this._hover = null;
    },

    highlight: function (pk, on) {
        var layer = this.getLayer(pk);
        on = on === undefined ? true : on;
        if (!layer) return;
        if (!this._map) return;
        if (on) {
            if (layer instanceof L.Polyline) {
                this._hover = new L.Polyline(layer.getLatLngs());
            }
            else if (layer instanceof L.MultiPolyline) {
                var coords = [];
                layer.eachLayer(function (l) { coords.push(l.getLatLngs()); });
                this._hover = new L.MultiPolyline(coords);
            }
            this._hover.setStyle(TREK_LAYER_OPTIONS.outlinestyle);
            this._hover.addTo(this._map);
            // Pop on top
            layer.setStyle(TREK_LAYER_OPTIONS.hoverstyle);
            this._map.removeLayer(layer).addLayer(layer);
        }
        else {
            if (this._hover) this._map.removeLayer(this._hover);
            layer.setStyle(TREK_LAYER_OPTIONS.style);
        }
    }
});


var POILayer = L.MarkerClusterGroup.extend({

    initialize: function (poisData) {
        L.MarkerClusterGroup.prototype.initialize.call(this, {
          showCoverageOnHover: false,
          disableClusteringAtZoom: 15,
          maxClusterRadius: 24,
          iconCreateFunction: function(cluster) {
              return new L.DivIcon({className: 'poi-marker-icon cluster',
                                    iconSize: [20, 20],
                                    iconAnchor: [12, 12],
                                    html: '<b>' + cluster.getChildCount() + '</b>'});
          }
        });

        for (var i=0; i < poisData.features.length; i++) {
            var featureData = poisData.features[i],
                marker = this.poisMarker(featureData,
                                         L.GeoJSON.coordsToLatLng(featureData.geometry.coordinates));
            this.addLayer(marker);
        }
    },

    poisMarker: function(featureData, latlng) {
        var img = L.Util.template('<img src="{SRC}" title="{TITLE}">', {
            SRC: featureData.properties.type.pictogram,
            TITLE: featureData.properties.type.label
        });

        var poicon = new L.DivIcon({className: 'poi-marker-icon',
                                    iconAnchor: [12, 12],
                                    html: img}),
            marker = L.marker(latlng, {icon: poicon});
        marker.properties = featureData.properties;

        /* If POI has a thumbnail, show popup on click */
        if (marker.properties.thumbnail) {
            marker.bindPopup(
                L.Util.template('<img src="{SRC}" width="110" height="110">', {
                    SRC: marker.properties.thumbnail
                }),
                {autoPan: false});
        }
        return marker;
    }
});



var FakeBoundsMapMixin = {
    __fakeBounds: function (bounds) {
        /* Depending on sidebar open/close, we correct the bounds of the map
        If init, we increase, else we reduce.
        */
        if (!this._loaded)
            return bounds;

        var mapBounds = this.getBounds(),
            from = arguments.length === 0;
        bounds = from ? mapBounds : bounds;

        var closed = $('#side-bar').hasClass('closed');
        if (closed) {
            return bounds;
        }

        var sidebarW = $('#side-bar').outerWidth() / $('#mainmap').width(),
            boundswidth = mapBounds.getSouthEast().lng - mapBounds.getSouthWest().lng,
            offset = sidebarW * boundswidth * (from ? 1 : -1);

        var oldSouthWest = bounds.getSouthWest(),
            southWest = L.latLng(oldSouthWest.lat, oldSouthWest.lng + offset);
        return L.latLngBounds(southWest, bounds.getNorthEast());
    },

    fitFakeBounds: function (bounds) {
        this.fitBounds(bounds);
        this.whenReady(function () {
            this.fitBounds(this.__fakeBounds(bounds));
        }, this);
    },

    getFakeBounds: function () {
        return this.__fakeBounds();
    }
};

L.Map.include(FakeBoundsMapMixin);


/**
 * Map initialization functions.
 * Callbacks of Django Leaflet.
 */
function mainmapInit(map, bounds) {
    map.attributionControl.setPrefix('');

    window.treksLayer = new TrekLayer(window.treks).addTo(map);

    if (!map.restoreView()) {
        var layerBounds = treksLayer.getBounds();
        map.fitFakeBounds(layerBounds.isValid() ? layerBounds : bounds);
    }

    // Move controls to the right
    map.zoomControl.setPosition('topright');
    L.control.fullscreen({
        position: 'topright',
        title: gettext('Fullscreen')
    }).addTo(map);

    map.addControl(new L.Control.Scale({imperial: false, position: 'bottomright'}));

    // Add reset view control
    map.whenReady(function () {
        new L.Control.ResetView(treksLayer.getBounds(), {position: 'topright'}).addTo(map);
    });

    // Filter map on filter
    $(window.trekFilter).on("filterchange", function(e, visible) {
        treksLayer.updateFromPks(visible);
    });

    // Filter list by map bounds
    map.on('moveend', function (e) {
      if (!map._loaded || mobile) return;  // Bounds should be set.

      $('#side-bar .result').removeClass('outbounds');
      if (!$(map._container).is(':visible')) {
        // If map is hidden, consider all visible :)
        return;
      }
      var visible = treksLayer.search(map.getFakeBounds()),
          visiblepks = $.map(visible, function (l) { return l.properties.pk; });
      $.each(treks.features, function (i, l) {
          var pk = l.properties.pk;
          if ($.inArray(pk, visiblepks) == -1) {
            $("#side-bar .result[data-id='" + pk + "']").addClass('outbounds');
          }
      });
    });

    // Go to detail page on double-click
    treksLayer.on('dblclick', function (e) {
        // Track event
        _gaq.push(['_trackEvent', 'Map', 'Doubleclick', e.layer.properties.name]);
        // Simulate click on link
        $('#trek-'+ e.layer.properties.pk +'.result a.pjax').click();
    });

    // Popup on click on trek 
    var popup = null;
    treksLayer.on('click', function (e) {
        var layer = e.layer;
        var html = '<h3>{NAME}</h3>' +
                   '<div class="clearfix">' +
                   '  <a href="{LINK}" class="pjax"><img src="{THUMBNAIL}"/></a>'+
                   '  <div class="description">{DESCRIPTION}</div>' +
                   '  <p class="popupdetail"><a href="{LINK}" class="pjax">{MORE}</a></p>' +
                   '</div>';
        html = L.Util.template(html, {
            NAME: layer.properties.name,
            DESCRIPTION: layer.properties.description_teaser,
            // This is tricky : use img url of trek in result list :)
            THUMBNAIL: $('#trek-'+ e.layer.properties.pk +'.result img').attr('src'),
            LINK: $('#trek-'+ e.layer.properties.pk +'.result a.pjax').attr('href'),
            MORE: gettext("More info...")
        });

        if (popup) {
            popup._close();

            // Click on already opened popup : close only.
            if (popup.pk == layer.properties.pk) {
                popup = null;
                return;
            }
        }

        var popupSettings = {};

        if(MOBILE) {
            popupSettings = {
                autoPan: true,
                closeButton: false,
                maxWidth: 250,
                autoPanPadding: new L.Point(5, 50)
            }
        } else {
            popupSettings = {
                autoPan: false
            };
        }

        popup = L.popup(popupSettings).setLatLng(e.latlng)
             .setContent(html)
             .openOn(map);
        popup.pk = layer.properties.pk;

        // Make sure clic on details will open as pjax (cause added after initial loading?)
        $("a.pjax", popup._container).click(function (event) {
            $.pjax.click(event, {container: '#content'});
            
            // Track event
            _gaq.push(['_trackEvent', 'Map', 'Popup', e.layer.properties.name]);
        });


        if(MOBILE) {
            $(popup._container).on('mouseup', function (event) {
                $.pjax({container: '#content', url:$("a.pjax", popup._container).attr('href')});
            });
        }
    });

    // Highlight result on mouseover
    treksLayer.on('mouseover', function (e) {
      $('#trek-'+ e.layer.properties.pk +'.result').addClass('active');
    });
    treksLayer.on('mouseout', function (e) {
      $('#trek-'+ e.layer.properties.pk +'.result').removeClass('active');
    });
}


function detailmapInit(map, bounds) {
    map.attributionControl.setPrefix('');
    L.control.fullscreen({
        position: 'topright',
        title: gettext('Fullscreen')
    }).addTo(map);

    // Minimize minimap by default
    map.whenReady(function () {
        map.minimapcontrol._minimize();
    });

    $('#pois-accordion').on('show', function (e) {
        var id = $(e.target).data('id'),
            marker = window.poisMarkers[id];

        // Prevent double-jump
        if (marker._animating === true)
            return;

        map.panTo(marker.getLatLng());

        // Add clusterized marker explicitly, will be removed on accordion close.
        marker._clusterized = (marker._map === undefined);
        if (marker._clusterized) {
            map.addLayer(marker);
        }
        // Jump!
        marker._animating = true;
        $(marker._icon).addClass('highlight');
        marker.openPopup();
        $(marker._icon).css('z-index', 3000);
        $(marker._icon).animate({"margin-top": "-=20px"}, "fast",
                                function(){
                                    marker._animating = false;
                                    $(this).animate({"margin-top": "+=20px"}, "fast");
                                });
    });

    $('#pois-accordion').on('hidden', function (e) {
        var id = $(e.target).data('id'),
            marker = window.poisMarkers[id];
        $(marker._icon).removeClass('highlight');
        marker.closePopup();
        // Restore clusterized markers (if still on map, i.e. zoom not changed)
        if (marker._clusterized && marker._map) {
            marker._map.removeLayer(marker);
            marker._map = undefined;
        }
    });


    // Trek
    var highlight = new L.GeoJSON(window.trek.geometry, {style: L.extend(TREK_LAYER_OPTIONS.outlinestyle, {clickable: false})})
                         .addTo(map);
    window.trekLayer = new L.GeoJSON(window.trek.geometry, {style: L.extend(TREK_LAYER_OPTIONS.hoverstyle, {clickable: false})})
                            .addTo(map);

    var wholeBounds = trekLayer.getBounds();

    // Show start and end
    trekLayer.eachLayer(function (layer) {
        if (layer instanceof L.MultiPolyline)
            return;

        map.whenReady(function () {
            var textPath = L.polyline(layer.getLatLngs(), {weight: 0}).addTo(map);
            textPath.setText('>     ', {repeat:true, offset: TREK_LAYER_OPTIONS.outlinestyle.weight * 0.75, attributes: TREK_LAYER_OPTIONS.arrowstyle});
        });

        L.marker(layer.getLatLngs()[0],
                 {clickable: false,
                  icon: new L.Icon({
                                iconUrl: IMG_URL + '/marker-source.png',
                                iconSize: [64, 64],
                                iconAnchor: [32, 64]
                    })
                 }).addTo(map);
        L.marker(layer.getLatLngs().slice(-1)[0],
                 {clickable: false,
                  icon: new L.Icon({
                                iconUrl: IMG_URL + '/marker-target.png',
                                iconSize: [64, 64],
                                iconAnchor: [32, 64]
                 })}).addTo(map);
    });

    // POIs Layer
    var poisLayer = new POILayer(pois);
    poisLayer.eachLayer(function (marker) {
        wholeBounds.extend(marker.getLatLng());
        window.poisMarkers[marker.properties.pk] = marker;
        /*
         * Open Accordion on marker click.
         * TODO: does not work correctly.
         */
        marker.off('click');  // Disable auto-control of popup
        marker.on('click', function (e) {
            var $item = $('#poi-item-' + marker.properties.pk);
            $item.click();
            var top = $('#pois-accordion').scrollTop(),
                toTop = $item.position().top;
            $('#pois-accordion').animate({
                scrollTop: top + toTop
            }, 1000);
        });

    });
    poisLayer.addTo(map);

    var parkingIcon = L.icon({
        iconUrl: IMG_URL + '/parking.png',
        iconSize: [24, 24],
        iconAnchor: [0, 0]
    });
    var parkingLocation = trek.properties.parking_location;
    if (parkingLocation) {
        var pos = L.latLng([parkingLocation[1], parkingLocation[0]]);
        L.marker(pos, {icon: parkingIcon})
         .bindPopup(trek.properties.advised_parking || gettext("Recommended parking"))
         .addTo(map);
        wholeBounds.extend(pos);
    }

    map.fitBounds(wholeBounds);
    map.zoomOut();

    var marker = null;
    $('#profilealtitude').on('hover:distance', function (event, meters) {
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }
        if (meters === null)
            return;
        trekLayer.eachLayer(function (layer) {
            if (layer instanceof L.MultiPolyline)
                return;
            var latLng = latLngAtDistance(layer, meters);
            if (latLng) {
                marker = L.circleMarker(latLng, TREK_LAYER_OPTIONS.positionstyle).setRadius(5).addTo(map);
            }
        });
    });


    // Add reset view control
    map.whenReady(function () {
        new L.Control.ResetView(wholeBounds, {position: 'topright'}).addTo(map);

        map.scrollWheelZoom.disable();
        var enableWheel = function () {
            map.scrollWheelZoom.enable();
            $('.helpclic').hide();
        };

        map.dragging.disable();
        $(map._container).css('cursor','pointer');
        var enablePan = function () {
            $(map._container).css('cursor','-moz-grab');
            $(map._container).css('cursor','-webkit-grab');
            map.dragging.enable();
        };

        // Enable wheel zoom on clic (~ focus)
        map.on('click', enableWheel);

        // Enable drag only after zoom change
        setTimeout(function () {
            map.on('zoomend', function () {
                enablePan();
                enableWheel();
            });
        }, 500);
    });
}

if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

function distanceMeters(p1, p2) {
  var R = 6371000,
      dLat = (p2.lat - p1.lat).toRad(),
      dLon = (p2.lng - p1.lng).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(p2.lat.toRad()) * Math.cos(p2.lat.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a) , Math.sqrt(1-a));
  var d = R * c;
  return d;
}

function latLngAtDistance(polyline, distance) {
  // Initialization of variables
  var points = polyline.getLatLngs(),
      distance_cum = 0.0;
  //iterate line points
  for (var i=1; i<points.length; i++) {
    var p1 = points[i-1],
        p2 = points[i];
    distance_cum = distance_cum + distanceMeters(p1, p2); //calcul distance
    if (distance_cum >= distance) {
        return L.latLng(p2.lat, p2.lng);
    }
  }
  return null;
}
