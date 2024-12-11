import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Btn , Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import DBServer from "../appwrite/config";
import { div } from "framer-motion/client";
import { PencilLine, Trash2 } from "lucide-react";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userdata);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            DBServer.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        DBServer.deletepost(post.$id).then((status) => {
            if (status) {
            DBServer.deletefile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    return post ? (
    <>
        <div className="w-screen flex justify-end gap-3 pt-4">
              {isAuthor && (
                        <div className="">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Btn bgColor="bg-green-700" className="mr-3">
                                <PencilLine />
                                </Btn>
                            </Link>
                            <Btn className="mr-8"  bgColor="bg-red-600" onClick={deletePost}>
                                <Trash2 />
                            </Btn>
                        </div>
                    )}
        </div>
        <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="w-full flex justify-center">
          <div className="relative overflow-hidden shadow-lg rounded-2xl max-w-full ">
            <img
              src={DBServer.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-gray-900 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg prose-stone max-w-none text-gray-700 leading-relaxed">
            {parse(post.content)}
          </div>
        </div>
      </div>
    </div>
        </>
    ) : null;
}