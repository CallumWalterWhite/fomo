import json
import sys
from pymongo import MongoClient
from .config import city_id
from bose import *

class MongoDBImportTask(BaseTask):
    def __init__(self):
        self.__import = MongoDBImport()

    def run(self, driver, data):
        self.__import.import_data('output/all.json')

class MongoDBImport():
    def __init__(self):
        self.client = MongoClient('mongodb://127.0.0.1:27017')
        self.db = self.client['fomo'] #set up to run against fomo database
        self.collection = self.db['locations']

    def parse_value(self, value):
        if (isinstance(value, str)):
            value = value.strip().replace("'", '"').replace("None", "null")
        try:
            # Try parsing the value as JSON object
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            # If parsing as object fails, try parsing as an array
            try:
                return json.loads(f"[{value}]")
            except (json.JSONDecodeError, TypeError):
                # If parsing as array fails, return the original string value
                return value

    def convert_large_integers(self, value):
        try:
            int_value = int(value)
            size_in_bytes = sys.getsizeof(int_value)
            if size_in_bytes > 8:
                print(f"Value '{int_value}' is larger than 8 bytes. Converting to smaller data type.")
                # Try converting to 64-bit integer
                if int_value >= -9223372036854775808 and int_value <= 9223372036854775807:
                    return int_value
                # If 64-bit conversion fails, convert to string
                return ""
            return int_value
        except ValueError:
            return value  # Return original value if it's not an integer

    def check_int_columns(self, row):
        for key, value in row.items():
            row[key] = self.convert_large_integers(value)

    def import_data(self, path_to_json):
        def get_json_data(json_file):
            with open(json_file, 'r', encoding="utf8") as file:
                data_list = json.load(file)
                for row in data_list:
                    row['CityId'] = city_id
                return data_list
        data_to_insert = get_json_data(path_to_json)
        try:
            self.collection.insert_many(data_to_insert)
            print("Data inserted successfully into MongoDB.")
        except Exception as e:
            print(f"Error: {e}")
        self.client.close()