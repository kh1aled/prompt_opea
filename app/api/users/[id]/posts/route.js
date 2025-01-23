import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request , {params}) => {
  try {
    //الاتصال بقاعدة البيانات
    console.log("connecting to DB");
  
    await connectToDB();

    const { id } = await params;



    const prompts = await Prompt.find({
        creator : id
    }).populate("creator");


    return new Response(JSON.stringify(prompts), { status: 221 });

  } catch (error) {
    return new Response("failed to fetch all prompts")
  }
};
