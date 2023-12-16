import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon} from "@heroicons/react/outline";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";

export default function Post({img, userImg, caption, username, id}){

    const {data:session} = useSession();
    const [comment, setComment] = useState("");

    async function sentComment(event){
        event.preventDefault();
        const commentToSend = comment;
        setComment("")
        await addDoc(collection(db, "posts", id, "comments"), {
            comment: comment,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }

    return(
        <div className="bg-white my-7 border rounded-md">
            <div className="flex items-center px-5">
                <img
                    className="h-12 rounded-full object-cover p-1 mr-3"
                    src={userImg}
                    alt={username}/>
                <p className="font-bold flex-1 ">{username}</p>
                <DotsHorizontalIcon className="h-5"></DotsHorizontalIcon>
            </div>

            <img className="object-cover w-full" src={img} alt=""/>

            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        <HeartIcon className="btn"></HeartIcon>
                        <ChatIcon className="btn"></ChatIcon>
                    </div>
                    <BookmarkIcon className="btn"></BookmarkIcon>
                </div>
            )}

            <p className="p-5 truncate"><span className="font-bold mr-2">{username}</span>{caption}</p>

            {session && (
                <form action="" className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7"></EmojiHappyIcon>
                    <input
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        type="text"
                        className="border-none flex-1 focus:ring-0"
                        placeholder="Enter your comment..."
                    />
                    <button
                        type="submit"
                        onClick={sentComment}
                        disabled={!comment.trim()}
                        className="text-blue-400 font-bold disabled:text-blue-200">Post</button>
                </form>
            )}
        </div>
    )
}