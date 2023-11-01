using compass.Models;

namespace compass.Persistence;

public interface IRepository<T>
    where T : Entity
{
    public List<T> Get();

    public T Get(string id);

    public T Create(T game);

    public void Update(string id, T updatedEntity);

    public void Delete(T gameForDeletion);

    public void Delete(string id);
}