using compass.Models;

namespace compass.Services;

public interface IPostService
{
    Post GetPost(string id);
    
    List<Post> GetPosts(string locationId);
    
    void CreatePost(Post post);
    
    void DeletePosts(Post post);
}
