# -*- coding: utf-8 -*-
import requests
import json
from collections import defaultdict

OUTPUT_FILE = '../data/china_area.json'
final_list = []


def gaode_chinaarea():
    ''' 获取高德的中国行政区
    文档地址: http://lbs.amap.com/api/webservice/reference/district/#t5
    '''
    gaode_url = 'http://restapi.amap.com/v3/config/district'
    requests_params = {
        'keywords': '中华人民共和国',
        'level': 'country',
        'subdistrict': 3,
        'extensions': 'base',
        'key': '高德开发者 KEY',
    }

    print('Get Gaode data from {}'.format(gaode_url))
    response = requests.get(url=gaode_url, params=requests_params)

    if response.status_code == requests.codes.ok:
        return response.json()
    else:
        print('ERROR: Get Gaode data error')
        exit(1)


def parse_province(province_list):
    for data in province_list:
        province_name = data['name']
        city_list = parse_city(data['districts'])
        province_el = {'province': province_name, 'city': city_list}
        final_list.append(province_el)


def parse_city(city_list):
    city_dict = defaultdict(dict)

    for data in city_list:
        city_name = data['name']

        # 删除 北京市市辖区，天津市市辖区 等
        if city_name.endswith('市辖区'):
            city_name = city_name[:-3]

        # 郊县数据不要
        if city_name.endswith('市郊县'):
            continue

        district_list = parse_district(data['districts'])
        city_dict[city_name] = district_list

    return city_dict


def parse_district(district_list):
    district_res = []
    for data in district_list:
        district_res.append(data['name'])
    return district_res


def output_file():
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=4)
        print("Write file {} done!".format(OUTPUT_FILE))


def main():

    response = gaode_chinaarea()
    province_list = response['districts'][0]['districts']

    if province_list is None:
        print("Parse gaode data error!")
        exit(1)
    else:
        print("Data OK! Now parse")
        parse_province(province_list)
        output_file()


if __name__ == '__main__':
    main()
