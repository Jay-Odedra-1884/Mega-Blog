import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/config";
import { Input, RTE, Select, Button } from "../index";

function PostForm({ post }) {
  const { handleSubmit, register, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await authService.uploadFile(data.image[0])
        : null;

      if (file) {
        authService.deleteFile(post.featuredImage);
      }

      const dbPost = authService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await authService.uploadFile(data.image[0]);

      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await authService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTranslator = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTranslator(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTranslator, setValue]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-2/3 h-auto bg-gray-500 py-4 px-8 mt-4 mb-4 rounded-xl">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-around">
            <div className="bg-black w-1/3 h-10 flex items-center text-white rounded-lg px-2">
              <Input
                className="bg-transparent text-white outline-none border-none"
                label="Title: "
                type="text"
                placeholder="Enter Title"
                defaultValue={getValues("title")}
                {...register("title", { required: true })}
              />
            </div>
            <div className="bg-black w-1/3 h-10 flex items-center text-white rounded-lg px-2">
              <Input
                className="bg-transparent text-white outline-none border-none"
                label="Slug: "
                type="text"
                placeholder="Slug is shown here"
                defaultValue={getValues("slug")}
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTranslator(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
          </div>
          <RTE
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        <div className="flex justify-around items-center">
          <div className="bg-black w-1/2 h-auto flex items-center text-white rounded-lg px-2 pr-0">
            <Input
              className="bg-transparent text-white outline-none border-none"
              label="Featured Image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div>
                <img
                  className="rounded-r-lg"
                  src={authService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                />
              </div>
            )}
          </div>
          <div className="bg-black h-10 flex items-center text-white rounded-lg px-2">
            <Select
              className="bg-transparent text-blue-400 outline-none border-none"
              label="Status: "
              options={["Active", "Inactive"]}
              {...register("status", { required: true })}
            />
          </div>
        </div>
        <Button type="submit" bgColor={post && "bg-green-500"}>
          {post ? "Update" : "Submit"}
        </Button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default PostForm;
