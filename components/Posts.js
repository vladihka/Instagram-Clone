import Post from "./Post";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, orderBy} from "firebase/firestore"
import {db} from "../firebase";

export default function Posts(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts"), orderBy(("timestamp"), "desc")), (snapshot) => {
                setPosts(snapshot.docs)
            }
        )
        return unsubscribe;
    }, []);
    return(
        <div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    userImg={post.data().profileImg}
                    img={post.data().image}
                    caption={post.data().caption}
                    username={post.data().username}>
                </Post>
            ))}
        </div>
    )
}