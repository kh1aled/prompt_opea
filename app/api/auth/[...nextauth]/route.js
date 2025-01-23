import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDB from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        // الاتصال بقاعدة البيانات
        await connectToDB();

        console.log("Google Profile:", profile); // تحقق من البيانات القادمة من Google

        // التحقق إذا كان المستخدم موجودًا
        const userExists = await User.findOne({ email: profile.email });

        // إذا لم يكن المستخدم موجودًا، قم بإنشائه
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // نجاح التسجيل
      } catch (error) {
        console.error("Error during signIn:", error);
        return false; // فشل التسجيل
      }
    },
    async session({ session }) {
      try {
        // الاتصال بقاعدة البيانات
        await connectToDB();

        // استرجاع المستخدم من قاعدة البيانات باستخدام البريد الإلكتروني
        const sessionUser = await User.findOne({ email: session.user.email });

        // إضافة معرف المستخدم (ID) إلى الجلسة
        session.user.id = sessionUser ? sessionUser._id.toString() : null;

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
