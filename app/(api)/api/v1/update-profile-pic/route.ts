import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import User from "@/models/user.model";
import { verifyToken } from "@/lib/jwt.lib";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const profilePic = body.profilePic;
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      {
        status: "error",
        msg: "unauthorized",
      },
      { status: 401 }
    );
  }

  if (!profilePic) {
    return NextResponse.json({
      status: "error",
      msg: "Please select a profile picture before uploading.",
    });
  }

  cloudinary.uploader.upload(profilePic, {
    folder: "profile-pics",
    width: 150,
    height: 150,
    crop: "fill",
  });

  const uploadResponse = await cloudinary.uploader.upload(profilePic, {
    folder: "profile-pics",
    width: 150,
    height: 150,
    crop: "fill",
  });

  const profilePicUrl = uploadResponse.secure_url;

  let userDetails;
  try {
    userDetails = await verifyToken(token);
    console.log(userDetails.id);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        msg: "unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    await User.findByIdAndUpdate(
      userDetails.id,
      {
        avatar: profilePicUrl,
      },
      { new: true }
    ).select("avatar");
  } catch (error) {
    return NextResponse.json({
      status: "error",
      msg: "unable to update profile pic",
    });
  }

  return NextResponse.json({
    status: "success",
    msg: "profile pic updated successfully",
    data: {
      profilePicUrl
    },
  });
};
