"use client"
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text_center flex-center flex-col">
        Discover & share
        <br className="max-md:hidden" />
        <div className="orange_gradient 
        text-center">
            Ai Powered Prompts</div>
      </h1>
      <p className="desc text-center p-3">Promptopia is an open-source AI prompting tool for modern world to discover, create
        and share cerative prompts
      </p>
      <Feed/>
    </section>
  );
};

export default Home;
