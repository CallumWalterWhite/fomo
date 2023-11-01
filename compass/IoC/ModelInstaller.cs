using Amazon.Util.Internal.PlatformServices;
using compass.Models;
using compass.Persistence;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;
using MongoDB.Driver;

namespace compass.IoC;

public static class ModelInstaller
{
    public static void InstallModel(this IServiceCollection serviceCollection, ConfigurationManager configurationManager)
    {
        serviceCollection.Configure<MongodbDatabaseSettings>(configurationManager.GetSection(nameof(MongodbDatabaseSettings)));
        serviceCollection.AddSingleton<IMongodbDatabaseSettings>(sp => sp.GetRequiredService<IOptions<MongodbDatabaseSettings>>().Value);
        
        serviceCollection.AddSingleton<IMongoClient>((serviceProvider) =>
        {
            IMongodbDatabaseSettings mongodbDatabaseSettings = serviceProvider.GetService<IMongodbDatabaseSettings>()!;
            return new MongoClient(mongodbDatabaseSettings.ConnectionString);
        });
        serviceCollection.AddSingleton<IMongoDatabase>((serviceProvider) =>
        {
            IMongodbDatabaseSettings mongodbDatabaseSettings = serviceProvider.GetService<IMongodbDatabaseSettings>()!;
            IMongoClient mongoClient = serviceProvider.GetService<IMongoClient>()!;
            return mongoClient.GetDatabase(mongodbDatabaseSettings.DatabaseName);
        });
        serviceCollection.AddScoped(typeof(IRepository<Post>), typeof(PostRepository));
    }
}