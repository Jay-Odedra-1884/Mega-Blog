import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/config";
import { Input, RTE, Select, Button } from "../index";

function PostForm({ post }) {
  const { handleSubmit ,register, watch, setValue, control, getValues } =
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
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
    }
    return "";
  },[]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTranslator(value.title), { shouldValidate: true });
      } 
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTranslator, setValue]);

  if (!post && !userData) {
    return <div>Loading...</div>; // Prevent rendering the form too early
  } else {
    
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
        <Input
          label="Title"
          type="text"
          placeholder="Enter Title"
          defaultValue={getValues("title")}
          {...register("title", { required: true })}
        />
        {console.log(getValues("title"))
        }

        <Input
          label="Slug"
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
}

export default PostForm;
