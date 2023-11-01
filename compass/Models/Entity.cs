using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace compass.Models;

public abstract class Entity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
}