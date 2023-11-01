using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace compass.Models;

public class Post : Entity
{
    [BsonElement("locationdata_id")]
    public string LocationDataId { get; set; }

    [BsonElement("locationName")]
    public string LocationName { get; set; }

    [BsonElement("locationCityId")]
    public int LocationCityId { get; set; }

    [BsonElement("locationCity")]
    public string LocationCity { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("locationPath")]
    public string LocationPath { get; set; }

    [BsonElement("picturePath")]
    public string PicturePath { get; set; }

    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; }

    [BsonElement("updatedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; }
}