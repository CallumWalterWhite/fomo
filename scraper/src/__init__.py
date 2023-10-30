from .mongodb import MongoDBImport
from .scrape_google_maps_links_task import ScrapeGoogleMapsLinksTask
from .scrape_google_maps_places_task import ScrapeGoogleMapsPlacesTask
from .mysql_import import MysqlImport

tasks_to_be_run = [
        ScrapeGoogleMapsLinksTask,
        MongoDBImport
        # ScrapeGoogleMapsPlacesTask,
]