using compass.Models;
using compass.Persistence;
using Microsoft.IdentityModel.Tokens;

namespace compass.Services;

public class NightPlannerService : INightPlannerService
{
    private const int PaginationSize = 10;
    
    private readonly IRepository<NightPlanner> _nightPlannerRepository;

    public NightPlannerService(IRepository<NightPlanner> nightPlannerRepository)
    {
        _nightPlannerRepository = nightPlannerRepository;
    }
    
    public NightPlanner GetNightPlanner(string id)
    {
        return _nightPlannerRepository.Get(id);
    }

    public IList<NightPlanner> GetNightPlans(int cityId, string searchTerm = "")
    {
        IEnumerable<NightPlanner> nightPlans;
        if (cityId > 0)
        {
            nightPlans = _nightPlannerRepository.Get((location) =>
                location.LocationCityId == cityId);
        }
        else
        {
            nightPlans = _nightPlannerRepository.Get((location) => true);
        }
        if (!searchTerm.IsNullOrEmpty())
        {
            nightPlans = nightPlans.Where(x => x.Title.Contains(searchTerm));
        }
        return nightPlans.ToList();
    }

    public void DeleteNightPlanner(string id)
    {
        NightPlanner entity = _nightPlannerRepository.Get(id);
        _nightPlannerRepository.Delete(entity);
    }

    public void UpdateNightPlanner(NightPlanner nightPlanner)
    {
        _nightPlannerRepository.Update(nightPlanner.Id, nightPlanner);
    }
    
    public void AddNightPlanner(NightPlanner nightPlanner)
    {
        _nightPlannerRepository.Create(nightPlanner);
    }
}