"use client";
import { useEffect, useState } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";
import Profile from "@components/Profile";
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
      
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);



  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmMessage = confirm(
      "Are You Sure you want to delete thid prompt"
    );

    if (confirmMessage) {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      const filterdPosts = posts.filter((p) => p._id !== post._id);

      setPosts(filterdPosts)
    }
  };

  return (
    <Profile
      name={"My"}
      desc="Welcome to your personalized page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
