"use client";
import PromptCard from "@components/PromptCard"
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  
  return (
    <section className="w-full p-4">
      <h1 className="head_text text-left ">
        <span className="blue_gradient">{name} Profile </span>
      </h1>
      <p className="desc font-inter text-left text-gray-700">{desc}</p>
        <div className="mt-10 prompt-layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  );
};

export default Profile;
