using compass.Persistence;
using Microsoft.IdentityModel.Tokens;

namespace compass.Services;

public class LocationService : ILocationService
{
    private const int PaginationSize = 10;
    
    private readonly IRepository<Location> _locationRepository;

    public LocationService(IRepository<Location> locationRepository)
    {
        _locationRepository = locationRepository;
    }

    public Location GetLocation(string id)
    {
        return _locationRepository.Get(id);
    }

    public IList<Location> GetLocations(int cityId, int locationType, string searchTerm)
    {
        IEnumerable<Location> locations = _locationRepository.Get((location) => 
            cityId <= 0 || location.CityId == cityId 
            && locationType <= 0 || location.MainCategory ==
            (locationType == 1 ? "Bar" : locationType == 1 ? "Pub" : "Nightclub"));
        if (!searchTerm.IsNullOrEmpty())
        {
            locations = locations.Where(x => x.SearchTerm.Contains(searchTerm));
        }
        return locations.ToList();
    }

    public void DeleteLocation(string id)
    {
        Location location = _locationRepository.Get(id);
        _locationRepository.Delete(location);
    }

    public void UpdateLocation(Location location)
    {
        _locationRepository.Update(location.Id, location);
    }
}