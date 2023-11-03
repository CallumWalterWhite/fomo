using compass.Models;
using MongoDB.Driver;

namespace compass.Persistence;

public class LocationRepository : Repository<Location>, IRepository<Location>
{
    public LocationRepository(IMongoDatabase mongoDatabase)
        : base(mongoDatabase.GetCollection<Location>("locations"))
    {
        mongoDatabase.GetCollection<Location>("posts");
    }
}