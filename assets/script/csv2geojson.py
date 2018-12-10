# -*- coding: utf-8 -*-
import json
import csv

CSV_FILE = '../data/hospital.csv'
GEOJSON_FILE = '../data/hospital.geojson'
# final feature list
features_list = []


def generate_feature_data(hospital_data):

    feature_data = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                hospital_data['geo_lat'],
                hospital_data['geo_lng'],
            ]
        },
        "properties": {
            "id": hospital_data['id'],
            "name": hospital_data['name'],
            "province": hospital_data['province'],
            "city": hospital_data["city"],
            "district": hospital_data["district"],
            "address": hospital_data["address"],
            "phone": hospital_data["phone"].strip(),
            "google_map_id": hospital_data["google_map_id"],
            "gaode_map_id": hospital_data['gaode_map_id'],
        },
    }
    return feature_data


def generate_geojson():
    geojson_data = {
        "type": "FeatureCollection",
        "features": features_list,
    }
    return geojson_data


def main():
    with open(CSV_FILE, 'r') as f:
        f_csv = csv.DictReader(f)
        for hospital_data in f_csv:
            feature_data = generate_feature_data(hospital_data)
            features_list.append(feature_data)

    geojson_data = generate_geojson()

    with open(GEOJSON_FILE, 'w') as f:
        json.dump(geojson_data, f, ensure_ascii=False)
        print("Write file {} done".format(GEOJSON_FILE))


if __name__ == '__main__':
    main()
