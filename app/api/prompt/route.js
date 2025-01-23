import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async () => {
  try {
    //الاتصال بقاعدة البيانات
    console.log("connecting to DB");
  
    await connectToDB();
  
    const prompts = await Prompt.find({}).populate("creator");


    return new Response(JSON.stringify(prompts), { status: 221 });

  } catch (error) {
    return new Response("failed to fetch all prompts")
  }
};
