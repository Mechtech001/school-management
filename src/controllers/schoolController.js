const myDb = require('../config/db');
const { calcDistance } = require('../utils/distance');

const addNewSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  
  console.log("trying to add school:", req.body); // checking what we get

  // manual validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: "Validation failed", details: "name is bad or missing" });
  }
  if (!address || typeof address !== 'string' || address.trim() === '') {
    return res.status(400).json({ error: "Validation failed", details: "address is bad or missing" });
  }
  
  const latNum = parseFloat(latitude);
  const lonNum = parseFloat(longitude);
  
  if (isNaN(latNum) || latNum < -90 || latNum > 90) {
    return res.status(400).json({ error: "Validation failed", details: "latitude is wrong" });
  }
  if (isNaN(lonNum) || lonNum < -180 || lonNum > 180) {
    return res.status(400).json({ error: "Validation failed", details: "longitude is wrong" });
  }

  try {
    const qry = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const vals = [name.trim(), address.trim(), latNum, lonNum];
    
    const [dbResult] = await myDb.execute(qry, vals);

    res.status(201).json({
      message: "School added successfully",
      id: dbResult.insertId
    });
  } catch (err) {
    console.log('insert error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function getSchools(req, res) {
  const userLatStr = req.query.latitude;
  const userLonStr = req.query.longitude;

  console.log("getting schools for coords:", userLatStr, userLonStr);

  const uLat = parseFloat(userLatStr);
  const uLon = parseFloat(userLonStr);

  // validation again
  if (isNaN(uLat) || uLat < -90 || uLat > 90) {
    return res.status(400).json({ error: "Validation failed", details: "invalid user latitude" });
  }
  if (isNaN(uLon) || uLon < -180 || uLon > 180) {
    return res.status(400).json({ error: "Validation failed", details: "invalid user longitude" });
  }

  try {
    const [allSchools] = await myDb.query('SELECT * FROM schools');
    
    if (allSchools.length === 0) {
      return res.status(200).json({ schools: [] }); // return empty if none
    }

    // calculate distance for each school
    let schoolsArr = [];
    for (let i = 0; i < allSchools.length; i++) {
      let s = allSchools[i];
      let dist = calcDistance(uLat, uLon, s.latitude, s.longitude);
      
      schoolsArr.push({
        id: s.id,
        name: s.name,
        address: s.address,
        latitude: s.latitude,
        longitude: s.longitude,
        distance_km: dist
      });
    }

    // sort them by distance
    schoolsArr.sort(function(a, b) {
      return a.distance_km - b.distance_km;
    });

    res.status(200).json({ schools: schoolsArr });
  } catch (err) {
    console.log('fetch error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addNewSchool,
  getSchools
};
