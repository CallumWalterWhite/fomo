using compass.Models;
using MongoDB.Driver;

namespace compass.Persistence;

public class NightPlannerRepository : Repository<NightPlanner>, IRepository<NightPlanner>
{
    public NightPlannerRepository(IMongoDatabase mongoDatabase)
        : base(mongoDatabase.GetCollection<NightPlanner>("nightplanners"))
    {
        mongoDatabase.GetCollection<NightPlanner>("nightplanners");
    }
}