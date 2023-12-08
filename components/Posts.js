import Post from "./Post";

export default function Posts(){
    const posts = [
        {
            id: "1",
            username: "vladihka",
            userImg: "https://media.licdn.com/dms/image/C4E03AQFbkO6E7nvOYQ/profile-displayphoto-shrink_800_800/0/1655032591139?e=2147483647&v=beta&t=vLFbMqVJpf-hgFUevz4UWnlGasQok9gYhI_RpU6KsOg",
            img: "https://images.unsplash.com/photo-1701435135977-5cad492e91ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
            caption: "Nice picture"
        },
        {
            id: "2",
            username: "n_alaska",
            userImg: "https://media.licdn.com/dms/image/C4E03AQFbkO6E7nvOYQ/profile-displayphoto-shrink_800_800/0/1655032591139?e=2147483647&v=beta&t=vLFbMqVJpf-hgFUevz4UWnlGasQok9gYhI_RpU6KsOg",
            img: "https://images.unsplash.com/photo-1701986789735-6e266acb128f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
            caption: "New picture from my city"
        },
    ]
    return(
        <div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                    username={post.username}>
                </Post>
            ))}
        </div>
    )
}