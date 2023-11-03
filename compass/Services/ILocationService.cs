using compass.Models;

namespace compass.Services;

public interface ILocationService
{
    Location GetLocation(string id);
    
    IList<Location> GetLocations(int cityId, int locationType, string searchTerm = "");
    
    void DeleteLocation(string id);
    
    void UpdateLocation(Location location);
}