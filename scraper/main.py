from bose.launch_tasks import launch_tasks
from bose import LocalStorage
from src import tasks_to_be_run, MongoDBImport

def run_tasks():
    launch_tasks(*tasks_to_be_run)
    count = LocalStorage.get_item('count', 0)

def run_import(): 
    MongoDBImport().import_data('output/all.json') 

options = {
    "Run tasks": run_tasks,
    "Run import": run_import
}

if __name__ == "__main__":
    print("Select an option:")
    for i, option in enumerate(options.keys()):
        print(f"{i+1}. {option}")
    option = int(input("Enter option number: "))
    options[list(options.keys())[option-1]]()
