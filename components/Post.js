import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon} from "@heroicons/react/outline";
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid";

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase";
import Moment from 'react-moment';

export default function Post({img, userImg, caption, username, id}){

    const {data:session} = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const unsibscribe = onSnapshot(
            query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),
            (snapshot) => {setComments(snapshot.docs)}
        )

    }, [db, id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", id, "likes"), (snapshot) => setLikes(snapshot.docs)
        )
    }, [db]);

    useEffect(() => {
        setHasLiked(
            likes.findIndex(like => like.id === session?.user.uid) !== -1
        )
    }, [likes]);

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

    async function likePost(){
        if(hasLiked){
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
        }
        else{
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            })
        }
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
                        {hasLiked ? (
                            <HeartIconFilled
                                onClick={likePost}
                                className="btn text-red-400"></HeartIconFilled>
                        ) : (
                            <HeartIcon
                                onClick={likePost}
                                className="btn"></HeartIcon>
                        )}
                        <ChatIcon className="btn"></ChatIcon>
                    </div>
                    <BookmarkIcon className="btn"></BookmarkIcon>
                </div>
            )}

            <p className="p-5 truncate"><span className="font-bold mr-2">{username}</span>{caption}</p>
            {comments.length > 0 && (
                <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
                    {comments.map(comment => (
                        <div className="flex items-center space-x-2 mb-2">
                            <img
                                className="h-7 rounded-full object-cover"
                                src={comment.data().userImage}
                                alt="user-image"/>
                            <p className="font-semibold">{comment.data().username}</p>
                            <p className="flex-1 truncate">{comment.data().comment}</p>
                            <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
                        </div>
                    ))}
                </div>
            )}

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