import csv
import mysql.connector
from bose import *

class MysqlImport(BaseTask):
    def __init__(self):
        self.config = {
            'user': 'callum',
            'password': '$aygon01',
            'host': 'nytesite-mysql.mysql.database.azure.com',
            'database': 'nytesite_location',
        }

    
    def run(self, driver, data):
        conn = mysql.connector.connect(**self.config)
        cursor = conn.cursor()

        def get_csv_schema(csv_file):
            with open(csv_file, 'r', encoding="utf8") as file:
                csv_reader = csv.reader(file)
                header = next(csv_reader)
                schema = {
                    'CityId': 'INT'
                }
                for column in header:
                    schema[column] = 'LONGTEXT'  # Default data type, you can adjust this
                return schema

        csv_file_path = 'output/all.csv'
        schema = get_csv_schema(csv_file_path)
        table_name = 'location'
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ("
        for column, data_type in schema.items():
            create_table_query += f"{column} {data_type}, "
        create_table_query = create_table_query.rstrip(', ') + ");"
        cursor.execute(create_table_query)
        insert_query = f"INSERT INTO {table_name} ({', '.join(schema.keys())}) VALUES ({', '.join(['%s'] * len(schema))})"
        with open(csv_file_path, 'r', encoding="utf8") as file:
            csv_reader = csv.reader(file)
            next(csv_reader)  # Skip the header
            for row in csv_reader:
                try:
                    row.insert(0, 2) # Add the city id
                    cursor.execute(insert_query, row)
                except mysql.connector.Error as err:
                    print(err)
                    #print(row)
        conn.commit()

        cursor.close()
        conn.close()
