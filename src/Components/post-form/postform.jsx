import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Btn, Input, Select, RTE } from "..";
import DBServer from "../../appwrite/config";

function Postform({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userdata);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await DBServer.uploadfile(data.image[0]) : null;
      if (file) {
        DBServer.deletefile(post.featuredImage);
      }
      const dbpost = await DBServer.updatepost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = await DBServer.uploadfile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbpost = await DBServer.createpost({
          ...data,
          userId: userdata?.$id,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-2/3 px-3 mb-6">
          <Input
            label="Title"
            placeholder="Enter post title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="post-slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <RTE
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-3">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Featured Image
            </label>
            <Input
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
          </div>
          {post && (
            <div className="w-full mb-4">
              <img
                src={DBServer.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Btn
            type="submit"
            bgColor={post ? "bg-green-500" : "bg-blue-500"}
            className="w-full text-white font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity"
          >
            {post ? "Update Post" : "Create Post"}
          </Btn>
        </div>
      </div>
    </form>
  );
}

export default Postform;

