import csv
from pymongo import MongoClient
from bose import *

class MongoDBImport(BaseTask):
    def __init__(self):
        self.client = MongoClient('mongodb://127.0.0.1:27017')
        self.db = self.client['test']
        self.collection = self.db['location']

    def run(self, driver, data):
        csv_file_path = 'output/all.csv'

        def get_csv_data(csv_file):
            with open(csv_file, 'r', encoding="utf8") as file:
                csv_reader = csv.DictReader(file)
                data_list = []
                for row in csv_reader:
                    # Assuming 'CityId' is present in your CSV file
                    row['CityId'] = 2
                    data_list.append(row)
                return data_list

        data_to_insert = get_csv_data(csv_file_path)
        try:
            self.collection.insert_many(data_to_insert)
            print("Data inserted successfully into MongoDB.")
        except Exception as e:
            print(f"Error: {e}")

        self.client.close()
