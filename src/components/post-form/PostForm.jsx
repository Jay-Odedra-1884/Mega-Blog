import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/config";
import { Input, RTE, Select, Button } from "../index";

function PostForm({ post }) {
  const { register, handelSubmit, watch, control, setValue, getValues } =
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
    } else {
      const file = authService.uploadFile(data.image[0]);

      if (file) {
        data.featuredImage = file.$id;
        const dbpost = await authService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbpost) {
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
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == title) {
        setValue("slug", slugTranslator(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTranslator, setValue]);

  return (
    <div>
      <form onSubmit={handelSubmit(submit)}>
        <div>
        <Input
          label="Title"
          type="text"
          placeHolder="Enter Title"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          type="text"
          placeHolder="Slug is shown here"
          {...register("slug", { required: true })}
          OnInput={(e) => {
            setValue("slug", slugTranslator(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE label="content" name="content" control={control} defaultValue={getValues("content")}/>
        </div>
        <div>
            <Input
                label="Featured Image"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {required: !post})}
            />
            {post && (
                <div>
                    <img src={authService.getFilePreview(post.featuredImage)} alt={post.title} />
                </div>
            )}
            <Select
                label="Status"
                options={["active", "inactive"]}
                {...register("status", {required:true})}
            />
            <Button type="submit" bgColor={post && "bg-green-500"}>
                {post ? "Update" : "Submit"}
            </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
