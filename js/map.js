function initMap() {
  const location = { lat: 41.8781, lng: -87.6298 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: location,
    scrollwheel: true,
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Chicago!!",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "<h3>Chicago!</h3>",
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.2,
    map,
    center: location,
    radius: 3000,
  });
  
  map.addListener("click", (e) => {
    new google.maps.Marker({
      position: e.latLng,
      map: map,
      title: "You clicked here!",
    });
  });

  // Search Box Integration 
  const input = document.getElementById("search-box");
  const searchBox = new google.maps.places.SearchBox(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) return;

      // Add marker 
      new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name,
      });
      
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });
}