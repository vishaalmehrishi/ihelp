import json
from pyquery import PyQuery
import pytz
import sys, json, datetime

def die(msg):
    print(msg)
    exit(1)

PAGE_URL = "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=5000"
EXCEL_URL = "http://sarthak.nhmmp.gov.in/covid/wp-content/themes/covid/facilities_occupancy_excel.php"
LAST_MODIFIED_HINDI = "अंतिम अपडेट: "
BADGES_HINDI = {
    "शासकीय": "GOVERNMENT",
    "निजी": "PRIVATE"
}
DEECRIPTIONS = {
    "Isolation Beds:": "isolation_beds",
    "Oxygen Supported:": "oxygen_supported",
    "Reserved ICU/HDU:": "reserved_icu_hdu"
}
FREE_ACCESS_HINDI = "दर / पैकेज : निःशुल्क"
PACKAGE_BUTTON_HINDI = "दर / पैकेज"
NOT_AVAILABLE_ENGLISH = "NOT_AVAILABLE"
GOOGLE_MAPS_PREFIX = "https://maps.google.com/?q="
BLANK_LAST_UPDATED_TEXT = "-"
INDIA_TIME = pytz.timezone("Asia/Kolkata")

def get_last_modified(d):
	last_modified_text = d(".alterna- .col-md-6:last").text()
	if last_modified_text.startswith(LAST_MODIFIED_HINDI):
		last_modified_text = last_modified_text[len(LAST_MODIFIED_HINDI):]
	else:
		die("Global last modified date not found")
	return last_modified_text

def scrape_geometry(tr):
	mapsurl = tr(".hospitaladdrress a:first").attr("href")
	if mapsurl.startswith(GOOGLE_MAPS_PREFIX):
		latlon = mapsurl[len(GOOGLE_MAPS_PREFIX):]
		if len(latlon.strip().split(" ,")) != 2:
			die("Weird latlon: " + latlon)
		lat, lon = map(float, latlon.strip().split(" ,"))
	else:
		die("Map URL didn't have GMaps prefix: " + mapsurl)
	return { "type": "Point", "coordinates": [ lon, lat ] }

def scrape_name(tr):
	name = tr(".hospitalname")[0].text.strip()

	name_parts = name.split("/")
	if len(name_parts) % 2 != 0: die("Weird name: " + repr(name))
	name_english = "/".join(name_parts[:len(name_parts)//2])
	name_hindi = "/".join(name_parts[len(name_parts)//2:])
	if len(name_parts) != 2:
		print("WARN NAME INCLUDES SLASHES")
		print(name_english)
		print(name_hindi)
	return { "name_english": name_english, "name_hindi": name_hindi }



def scrape_type(tr):
	badge = tr(".hospitalname .badge").text()
	if badge not in BADGES_HINDI:
		die("Unexpected badge text " + badge)
	return BADGES_HINDI[badge]

def scrape_last_updated(tr):
	last_updated_text = tr(".last-updated span").text()
	if last_updated_text == BLANK_LAST_UPDATED_TEXT:
		return None
	return INDIA_TIME.localize(datetime.datetime.strptime(last_updated_text, "%d-%m-%Y, %H:%M:%S")).isoformat()

def scrape_bed_availability(tr):
	bed_status_counts = tr(".bed-status").text().split(" / ")
	if len(bed_status_counts) != 2:
		die("Weird bed count: ", " / ".join(bed_status_counts))
	return {
	    "total_beds": int(bed_status_counts[0]),
	    "available_beds": int(bed_status_counts[1])
	}

def scrape_deecriptions(tr):
	result = {}
	for li in tr(".deecriptions li"):
		name = PyQuery(li)("small").text()
		val = PyQuery(li)("label").text()
		if name in DEECRIPTIONS:
			result[DEECRIPTIONS[name]] = int(val)
		else:
			die("Unexpected deecription text " + name)
	return result

def scrape_rates_info(tr):
	package_button = tr(".hospitaladdrress a:last")
	if "no-package" in package_button.attr("class"):
		if "Not Available" in package_button.text():
			return { "access": "NOT_AVAILABLE" }
		elif package_button.text() != FREE_ACCESS_HINDI:
			die("Unexpected text in no-package button: " + package_button.text())
		else:
			return { "access": "FREE" }
	else:
		if package_button.text() != PACKAGE_BUTTON_HINDI:
			die("Unexpected text in package button: " + package_button.text())
		elif "://" not in package_button.attr("href"):
			die("Unexpected href on package button: " + package_button.attr("href"))
		else:
			return { "access": "PAID", "rates_info_link":  package_button.attr("href") }

def tr_is_contact_info(tr):
	# The contact info row has a single cell with colspan=2.
	return len(tr("td")) == 1

def scrape_contact_info(tr):
	result = {}
	for i, contact in enumerate(tr(".contact")):
		if len(contact) == 0: continue
		result["contact_" + str(i+1) + "_phone"] = PyQuery(contact)("a").text()
		name = contact.find("i").tail.strip()
		if name: result["contact_" + str(i+1) + "_name"] = name.strip(": ")
	return result


def scrape_page(d):
	features = []

	trs = d(".wrapper-tbl .hospital-status tbody tr")
	if len(trs) == 0:
		die("No rows found in table")

	i = 0
	while i < len(trs):
		tr = PyQuery(trs[i])
		feature = {
		   "type": "Feature",
		   "geometry": scrape_geometry(tr),
		   "properties": {
				"type": scrape_type(tr),
				"last_updated": scrape_last_updated(tr),
				**scrape_name(tr),
				**scrape_bed_availability(tr),
				**scrape_deecriptions(tr),
				**scrape_rates_info(tr),
			}
		}

		i += 1
		subsequent_tr = PyQuery(trs[i])
		if tr_is_contact_info(subsequent_tr):
			feature["properties"].update(scrape_contact_info(subsequent_tr))
			i += 1
		features.append(feature)

	return {
	    "type": "FeatureCollection",
	    "features": features
	}

def scrape_districts_excel(d):
	trs = d("table tbody tr")
	if len(trs) == 0:
		die("No rows found in Excel table")
	result = {}
	bad_names = set()
	for tr in trs:
		tds = PyQuery(tr)("td")
		if not tds[0].text: continue
		district = tds[1].text.strip()
		name_english = tds[2].text.strip()

		if name_english in bad_names: continue

		if name_english in result:
			if result[name_english] != district:
				print("Same name different districts: " + name_english + " - " + district + " / " + result[name_english])
				del result[name_english]
				bad_names.add(name_english)

		result[name_english] = district
	return result

def merge_page_scrape_with_excel_scrape(page_scrape, excel_scrape):
	for feature in page_scrape["features"]:
		if feature["properties"]["name_english"] in excel_scrape:
			feature["properties"]["district"] = excel_scrape[feature["properties"]["name_english"]]
	return page_scrape


def scrap_mp_data():
    print('received scrap event for MP:')
    d = PyQuery(PAGE_URL)
    print("Last modified", get_last_modified(d))

    return merge_page_scrape_with_excel_scrape(scrape_page(d), scrape_districts_excel(PyQuery(EXCEL_URL)))