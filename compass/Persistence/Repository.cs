using System.Linq.Expressions;
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
    
    public List<T> Get() => _entities.Find(entity => true).ToList();
    
    public List<T> Get(Expression<Func<T,bool>> filter) => _entities.Find(filter).ToList();

    public T Get(string id) => _entities.Find(entity => entity.Id == id).FirstOrDefault();

    public T Create(T entity)
    {
        _entities.InsertOne(entity);
        return entity;
    }

    public void Update(string id, T updatedT) => _entities.ReplaceOne(entity => entity.Id == id, updatedT);

    public void Delete(T entityForDeletion) => _entities.DeleteOne(entity => entity.Id == entityForDeletion.Id);

    public void Delete(string id) => _entities.DeleteOne(entity => entity.Id == id);
}