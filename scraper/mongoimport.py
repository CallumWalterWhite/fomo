import csv
import json
import sys
from pymongo import MongoClient
from bose import *

class MongoDBImport():
    def __init__(self):
        self.client = MongoClient('mongodb://127.0.0.1:27017')
        self.db = self.client['test']
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

    def run(self):
        csv_file_path = 'output/all.csv'

        def get_csv_data(csv_file):
            with open(csv_file, 'r', encoding="utf8") as file:
                csv_reader = csv.DictReader(file)
                data_list = []
                for row in csv_reader:
                    # Assuming 'CityId' is present in your CSV file
                    row['CityId'] = 2
                    self.check_int_columns(row)
                    # Parse each column to check if it can be converted to an object or an array
                    for key in row.keys():
                        row[key] = self.parse_value(row[key])
                    data_list.append(row)
                return data_list

        data_to_insert = get_csv_data(csv_file_path)
        try:
            self.collection.insert_many(data_to_insert)
            print("Data inserted successfully into MongoDB.")
        except Exception as e:
            print(f"Error: {e}")

        self.client.close()


if __name__ == "__main__":
    MongoDBImport().run()