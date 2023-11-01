using compass.Models;
using MongoDB.Driver;

namespace compass.Persistence;

public abstract class Repository<T>
    where T : Entity
{
    private readonly IMongoCollection<T> _entities;

    protected Repository(IMongoCollection<T> entities)
    {
        _entities = entities;
    }
    
    public List<T> Get() => _entities.Find(game => true).ToList();

    public T Get(string id) => _entities.Find(game => game.Id == id).FirstOrDefault();

    public T Create(T game)
    {
        _entities.InsertOne(game);
        return game;
    }

    public void Update(string id, T updatedT) => _entities.ReplaceOne(game => game.Id == id, updatedT);

    public void Delete(T gameForDeletion) => _entities.DeleteOne(game => game.Id == gameForDeletion.Id);

    public void Delete(string id) => _entities.DeleteOne(game => game.Id == id);
}