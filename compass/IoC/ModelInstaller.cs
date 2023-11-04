using Amazon.Util.Internal.PlatformServices;
using compass.Models;
using compass.Persistence;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;
using MongoDB.Driver;

namespace compass.IoC;

public static class ModelInstaller
{
    public static void InstallModel(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddSingleton<IMongoClient>((serviceProvider) => new MongoClient(serviceProvider.GetConfiguration("ConnectionString")));
        serviceCollection.AddSingleton<IMongoDatabase>((serviceProvider) =>
        {
            IMongoClient mongoClient = serviceProvider.GetService<IMongoClient>()!;
            return mongoClient.GetDatabase(serviceProvider.GetConfiguration("DatabaseName"));
        });
        serviceCollection.AddScoped(typeof(IRepository<Post>), typeof(PostRepository));
        serviceCollection.AddScoped(typeof(IRepository<Location>), typeof(LocationRepository));
    }

    private static string? GetConfiguration(this IServiceProvider serviceProvider, string key)
    {
#if DEBUG
            IConfiguration configuration = serviceProvider.GetService<IConfiguration>()!;
            IConfigurationSection configValue = configuration.GetSection(key)!;
            return configValue.Value;
#endif
#if !DEBUG
            string? configValue = Environment.GetEnvironmentVariable(key);
            return configValue;
#endif
    } 
}