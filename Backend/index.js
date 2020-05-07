// Import's
const express = require("express");

const youtube = require("youtube-api");

const uuid = require("uuid/v4");

const cors = require("cors");

const open = require("open");

const multer = require("multer");

const fs = require("fs");

const credentials = require("./credentials.json")
// Init app
const app = express();

// Middleware
app.use(express.json())
app.use(cors());

const storage = multer.diskStorage({
    destination: './',
    filename(req, file, res) {
        const newFileName = `${uuid()}-${file.originalname}`


        res(null, newFileName);
    }
})

const uploadVideoFile = multer({
    storage: storage
}).single("videoFile")


app.post('/upload', uploadVideoFile,(req,res) => {
    if(req.file) {
        const filename = req.file.filename;
        const {title, description} = req.body

        open(oAuth.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/youtube.upload',
            state: JSON.stringify({
                filename, title, description
            })
        }))
    }
})

app.get('/oauth2callback',(req,res) => {
    res.redirect('https://jlpeb.csb.app/success')
    const {filename, title, description} = JSON.parse(req.query.state)

    oAuth.getToken(req.query.code, (err, tokens) => {
        if(err) {
            console.log(err)
            return;
        }

        oAuth.setCredentials(tokens);
        
        
        
        youtube.video.insert({
            resource: {
                snippet: {title, description},
                status: {privacyStatus: 'private'}
            },
            part: 'snippet,status',
            media: {
                body: fs.createReadStream(filename)
            }
        }, (err,data) => {
            console.log("Done")
            process.exit();
        })
    
    })
})

const oAuth = youtube.authenticate({
    type: 'oauth',
    client_id: credentials.web.client_id,
    client_secret: credentials.web.client_secret,
    redirect_url: credentials.web.redirect_uris[0]
})

// Port
const PORT = 3000

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}` )
})