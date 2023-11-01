namespace compass.IoC;

public interface IMongodbDatabaseSettings
{
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
}