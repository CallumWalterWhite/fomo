using compass.Models;

namespace compass.Services;

public interface IPostService
{
    Post GetPost(string id);
}