"use client";
import { useEffect, useState } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "@node_modules/next/navigation";
const UpdatePrompt = () => {
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();
  const searhParams = useSearchParams();
  const promptId = searhParams.get("id");

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    if (!promptId) {
      return alert("pompt id not found");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // تحديد نوع المحتوى
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
