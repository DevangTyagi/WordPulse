import React from "react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { Btn, Input, Select, RTE } from "..";
import DBServer from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function Postform({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
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
    console.log(data)
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

        console.log("Redux Userdata:", userdata);

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
        .replace(/\s/g, "-")

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe(); 
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
     <div className="w-2/3 px-2">   
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={DBServer.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
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
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Btn>
      </div>
    </form>
  );
}

export default Postform;
