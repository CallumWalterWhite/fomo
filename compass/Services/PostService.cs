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
}