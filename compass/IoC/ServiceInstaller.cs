using compass.Services;

namespace compass.IoC;

public static class ServiceInstaller
{
    
    public static void InstallService(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IPostService, PostService>();
        serviceCollection.AddScoped<ILocationService, LocationService>();
    }
}