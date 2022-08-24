// Port
process.env.PORT = process.env.PORT || 3000

// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//End of Token
// 60 Seconds * 60 min * 24 hours * 5 days
process.env.END_TOKEN = 1000 * 60 * 60 * 24 * 5

//Autentication SEED
process.env.SEED = process.env.SEED || "autenthication-seed"

// Data Base
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/godot';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB
