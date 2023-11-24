using MongoDB.Bson.Serialization.Attributes;

namespace compass.Models;

[BsonIgnoreExtraElements]
public class NightPlanner : Entity
{
    [BsonElement("title")]
    public string Title { get; set; }
    
    [BsonElement("description")]
    public string Description { get; set; }
    
    [BsonElement("locationCityId")]
    public int LocationCityId { get; set; }

    [BsonElement("locationCity")]
    public string LocationCity { get; set; }
    
    [BsonElement("locationplans")]
    public List<LocationPlan> LocationPlans { get; set; } 
}

[BsonIgnoreExtraElements]
public class LocationPlan : Entity
{
    [BsonElement("locationdata_id")]
    public string locationdata_id { get; set; }
    
    [BsonElement("duration")]
    public int Duration { get; set; }
    
    [BsonElement("order")]
    public int Order { get; set; }
    
    [BsonElement("longitude")]
    public float? Longitude { get; set; }
    
    [BsonElement("latitude")]
    public float? Latitude { get; set; }
}