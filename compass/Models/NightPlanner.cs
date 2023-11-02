namespace compass.Models;

public class NightPlanner : Entity
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public List<LocationPlan> LocationPlans { get; set; } 
}

public class LocationPlan
{
    public string locationdata_id { get; set; }
    
    public int Duration { get; set; }
    
    public int IndexOrder { get; set; }
    
    public float Longitude { get; set; }
    
    public float Latitude { get; set; }
}