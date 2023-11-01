using compass.Models;
using MongoDB.Driver;

namespace compass.Persistence;

public class PostRepository : Repository<Post>, IRepository<Post>
{
    public PostRepository(IMongoDatabase mongoDatabase)
        : base(mongoDatabase.GetCollection<Post>("posts"))
    {
        mongoDatabase.GetCollection<Post>("posts");
    }
}