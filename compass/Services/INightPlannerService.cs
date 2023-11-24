using compass.Models;

namespace compass.Services;

public interface INightPlannerService
{
    NightPlanner GetNightPlanner(string id);
    
    IList<NightPlanner> GetNightPlans(int cityId, string searchTerm = "");
    
    void DeleteNightPlanner(string id);
    
    void UpdateNightPlanner(NightPlanner nightPlanner);

    void AddNightPlanner(NightPlanner nightPlanner);
}