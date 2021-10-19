const MyContract = artifacts.require('MyContract')
const fs = require('fs')
const { stringify } = require('querystring')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');
var FormData = require('form-data');
var request = require('request');

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        // {
        //     "trait_type": "Strength",
        //     "value": 0
        // },
        // {
        //     "trait_type": "Speed",
        //     "value": 0
        // },
        // {
        //     "trait_type": "Stamina",
        //     "value": 0
        // }
    ]
}
module.exports = async callback => {
    const mc = await MyContract.deployed()
    length = await mc.getNumberOfClips()


    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your clip ' + index + ' of ' + length)
        let clipMetadata = metadataTemple
        let clipOverview = await mc.clips(index)
        console.log(clipOverview)
        index++

        clipMetadata['name'] = clipOverview['name']
        clipMetadata['description'] = 'A super cool clip'
        if (fs.existsSync('metadata/' + clipMetadata['name'].toLowerCase().replace(/\s/g, '-') +  '.json')) {
            console.log('File already found')
            continue
        }

        console.log(clipMetadata['name'])
        clipMetadata['image'] = clipOverview['url']
        console.log(clipMetadata['image'])
        // clipMetadata['attributes'][0]['value'] = clipOverview['strength']['words'][0]
        // clipMetadata['attributes'][1]['value'] = clipOverview['speed']['words'][0]
        // clipMetadata['attributes'][2]['value'] = clipOverview['stamina']['words'][0]

        // if (process.env.UPLOAD_IPFS == true) {
        //     image = upload_to_ipfs(clipMetadata['image'])
        // }
        image = upload_to_ipfs(clipMetadata['image'])
        filename = 'metadata/' + clipMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(clipMetadata)
        console.log(data)
        // fs.writeFileSync(filename + '.json', data)
    }
    callback(mc)
}

function upload_to_ipfs(image_url) {
    // ipfs_url = "http://localhost:5001/api/v0/add"
    // console.log("in request")
    // var data = new FormData();
    // data.append("file", "https://d2sav2pm61zydq.cloudfront.net/comic/album/06606864-a313-4a16-8bc0-8f28173d5ced/1/00034200.jpg");

    // console.log(data)

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:5001/api/v0/add');
    // xhr.send(data);
    // var d = xhr.responseText;
    // console.log("Data", d)

    var data = new FormData();
    data.append('file', 'https://d2sav2pm61zydq.cloudfront.net/comic/album/06606864-a313-4a16-8bc0-8f28173d5ced/1/00034200.jpg');

    var config = {
    method: 'post',
    url: 'http://localhost:5001/api/v0/add',
    headers: { 
        ...data.getHeaders()
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

    // var options = {
    //     'method': 'POST',
    //     'url': 'http://localhost:5001/api/v0/add',
    //     'headers': {
    //     },
    //     formData: {
    //         'file': 'https://d2sav2pm61zydq.cloudfront.net/comic/album/06606864-a313-4a16-8bc0-8f28173d5ced/1/00034200.jpg'
    //     }
    // };
    // request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log("res", response.body);

    // });

    // var jsonRes = JSON.parse(data);
    // console.log("JSON", jsonRes["Data"]);


    // axios.get('https://esports.videogram.com/social/manga/a55b7f54-4254-468f-ab4a-0c157120089e/gridv2/?album_uuid=06606864-a313-4a16-8bc0-8f28173d5ced&width=290&height=400&unit_width=60&max_size=4&margin_width=2&x_margin=2&y_margin=2&layout=grid&subframes=false&frames=true')
    //     .then(data => {
    //         console.log("res", data.json());
    //     }, error => {
    //         console.log("error", error)
    //     });
}
