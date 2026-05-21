// found this haversine formula online, calculates distance in km
function calcDistance(lat1, lon1, lat2, lon2) {
  const earthRad = 6371; 
  
  const toRads = function(deg) { 
    return deg * (Math.PI / 180); 
  };

  const diffLat = toRads(lat2 - lat1);
  const diffLon = toRads(lon2 - lon1);
  
  const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
            Math.sin(diffLon / 2) * Math.sin(diffLon / 2) * Math.cos(toRads(lat1)) * Math.cos(toRads(lat2)); 
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  
  const dist = earthRad * c;
  
  // round to 2 decimals
  return Number(dist.toFixed(2));
}

module.exports = { calcDistance };
