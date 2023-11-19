import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";

const PostsWidget = ({ locationId, cityId, isProfile = false }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]); 

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/c/${cityId}`, {
      method: "GET"
    });
    const data = await response.json();
    dispatch(setPosts(data));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${locationId}/posts`,
      {
        method: "GET"
      }
    );
    const data = await response.json();
    dispatch(setPosts(data));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.length === 0 ? (
        <p>No posts or promotions available.</p>
      ) : (
        posts.map(
          ({
            _id,
            locationdata_id,
            locationName,
            locationCityId,
            locationCityName,
            description,
            locationPath,
            picturePath
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              locationdata_id={locationdata_id}
              locationName={locationName}
              locationCityId={locationCityId}
              locationCity={locationCityName}
              description={description}
              locationPath={locationPath}
              picturePath={picturePath}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
