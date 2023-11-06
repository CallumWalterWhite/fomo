using compass.Models;
using compass.Persistence;

namespace compass.Services;

public class PostService : IPostService
{
    private readonly IRepository<Post> _postRepository;

    public PostService(IRepository<Post> postRepository)
    {
        _postRepository = postRepository;
    }
    
    public Post GetPost(string id)
    {
        Post post = _postRepository.Get(id);
        return post;
    }

    public List<Post> GetPosts(string locationId)
    {
        return _postRepository.Get((post) => post.LocationDataId == locationId);
    }

    public void CreatePost(Post post)
    {
        _postRepository.Create(post);
    }

    public void DeletePosts(Post post)
    {
        _postRepository.Delete(post);
    }
}