// app/api/profile/update/route.ts
import { supabaseServer } from "@/lib/supabase/server";
import { getTrpcCaller } from "@/server/server";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";



export async function PATCH(req: Request) {
    const { userId } = await auth();
    
    if (!userId) {return new Response("Unauthorized", { status: 401 });}
    
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const file = formData.get("image") as File | null;
    
    if (!name) {return new Response("Name is required", { status: 400 });}
    
    const trpc = await getTrpcCaller();
    let imagePath: string | null = null;
  
    if (file) {
      const oldImagePath = await trpc.user.getImagePathById({ id: userId });
      if (oldImagePath) {
        const { error: deleteError } = await supabaseServer.storage
            .from("blog-image")
            .remove([oldImagePath]);
        if (deleteError) {
            console.error("Delete error", deleteError.message);
            return new Response("Failed to delete old image", { status: 500 });
        }
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileExt = file.name.split(".").pop();
      const fileName = `photo-profile/${Date.now()}-${randomUUID()}.${fileExt}`;
  
      const { error } = await supabaseServer.storage
        .from("blog-image")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true,
        });
  
      if (error) {
        console.error("Upload error", error.message);
        return new Response("Failed to upload image", { status: 500 });
      }
  
      imagePath = `${fileName}`;
    }
  
    try {
      const user = await trpc.user.updateUser(
        {
          id: userId,
          name,
          image: imagePath,
        }
      )
  
      return Response.json({ success: true, user });
    } catch (err) {
      console.error(err);
      return new Response("Server error", { status: 500 });
    }
  }