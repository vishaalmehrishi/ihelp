const axios = require('axios');
const $ = require('cheerio');

var PAGE_URL = "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=5"
var GOOGLE_MAPS_PREFIX = "https://maps.google.com/?q="
var BLANK_LAST_UPDATED_TEXT = "-"
var FREE_ACCESS_HINDI = "दर / पैकेज : निःशुल्क"
var PACKAGE_BUTTON_HINDI = "दर / पैकेज"
var BADGES_HINDI = {
    "शासकीय": "GOVERNMENT",
    "निजी": "PRIVATE"
}
var DESCRIPTIONS = {
    "Isolation Beds:": "isolation_beds",
    "Oxygen Supported:": "oxygen_supported",
    "Reserved ICU/HDU:": "reserved_icu_hdu"
}

var isValidTr = (tr) => { // alternating filler tr's do not have hospitalname divs
    var a = tr("div.hospitalname")
    if (a.length > 0) {
        return true
    }
    return false
}

var scrapeGeometry = (tr) => {
    var mapsUrl = tr(".hospitaladdrress a:first")[0].attribs.href
    if (mapsUrl.startsWith(GOOGLE_MAPS_PREFIX)) {
        var latLon = mapsUrl.slice(GOOGLE_MAPS_PREFIX.length).trim()
        if (latLon.split(" ,").length != 2) {
            throw new Error("Weird latLon")
        }
        var [lon, lat] = latLon.split(" ,")
        return { "type": "Point", "coordinates": [ lon, lat ] }
    }
    throw new Error(`Map URL didn't have GMaps prefix: ${mapsUrl}`)
}

var scrapeType = (tr) => {
    var badge = tr(".hospitalname .badge").text().trim()
    if (!badge in BADGES_HINDI) {
        throw new Error(`Unexpected badge text ${badge}`)
    }
    return BADGES_HINDI[badge]
}

var scrapeLastUpdated = (tr) => {
    var lastUpdatedText = tr(".last-updated span").text().trim()
    if (!lastUpdatedText || lastUpdatedText === BLANK_LAST_UPDATED_TEXT) {
        return null
    }
    return lastUpdatedText // TODO: convert to India local time
}

var scrapeName = (tr) => {
    var name = tr(".hospitalname")[0].children[0].data.trim()
    var [nameEnglish, nameHindi, ...rest] = name.split("/")
    if (rest.length > 0) {
        throw new Error(`Weird name: ${rest.join("/")}`)
    }
    return { "name_english": nameEnglish, "name_hindi": nameHindi }
}

var scrapeBedAvailability = (tr) => {
    var bedStatusCounts = tr(".bed-status").text().split(" / ")
    if (bedStatusCounts.length !== 2) {
        throw new Error(`Weird bed count: ${bedStatusCounts.join(" / ")}`)
    }
    return { "total_beds": parseInt(bedStatusCounts[0]), "available_beds": parseInt(bedStatusCounts[1])	}
}

var scrapeDescriptions = (tr) => {
    var result = {}
    for (var el of tr('.deecriptions li')) {
        var li = $.load(el)
        var name = li('small').text()
        if (name in DESCRIPTIONS) {
            var val = li('label').text()
            result[DESCRIPTIONS[name]] = parseInt(val)
        } else {
            throw new Error(`Unexpected deecription text: ${name}`)
        }
    }
    return result
}

var scrapeRatesInfo = (tr) => {
    var packageButton = tr(".hospitaladdrress a:last")
    var elementClass = packageButton[0].attribs.class
    var text = $.load(packageButton[0]).text() // load into $ to acquire nested text
    var href = packageButton[0].attribs.href
    if (elementClass.includes("no-package")) {
        if (text.includes("Not Available")) {
			return { "access": "NOT_AVAILABLE" }
        } else if (text !== FREE_ACCESS_HINDI) {
            throw new Error(`Unexpected text in no-package button: ${text}`)
        } else {
            return { "access": "FREE" }
        }
    } else {
        if (text !== PACKAGE_BUTTON_HINDI) {
            throw new Error(`Unexpected text in package button ${text}`)
        } else if (!href.includes("://")) {
            throw new Error(`Unexpected href in package button ${href}`)
        } else {
			return { "access": "PAID", "rates_info_link": href }
        }
    }
}

exports.handler = async (event) => {
    var { data } = await axios.get(PAGE_URL)
    var features = []
    var html = $.load(data)
    
    var trs = html('.wrapper-tbl .hospital-status tbody tr')
    trs.each((i, el) => {
        try {
            var tr = $.load(el)
            if (isValidTr(tr)) {
                var feature = {
                    "type": "Feature",
                    "geometry": scrapeGeometry(tr),
                    "properties": {
                         "type": scrapeType(tr),
                         "last_updated": scrapeLastUpdated(tr),
                         ...scrapeName(tr),
                         ...scrapeBedAvailability(tr),
                         ...scrapeDescriptions(tr),
                         ...scrapeRatesInfo(tr),
                    }
                }
                features.push(feature)
            }
        } catch (error) {
            console.log(error.message)
        }
    })
    return {
	    "type": "FeatureCollection",
	    "features": features
	};
};
