function initMap() {
  var centerPoint = {lat: 59.9386651, lng: 30.3205804};
  var icon = "../img/icon-map-pin.svg";
  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 16,
    center: centerPoint
  });
  var marker = new google.maps.Marker({
    position: centerPoint,
    map: map,
    icon: icon
  });
}
