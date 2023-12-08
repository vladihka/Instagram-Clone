import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";

export default function Post({img, userImg, caption, username, id}){
    return(
        <div className="bg-white my-7 border rounded-md">
            <div className="flex items-center px-5">
                <img
                    className="h-12 rounded-full object-cover p-1 mr-3"
                    src={userImg}
                    alt={username}/>
                <p className="font-bold flex-1 ">{username}</p>
                <EllipsisHorizontalIcon className="h-5"></EllipsisHorizontalIcon>
            </div>
            <img className="object-cover w-full" src={img} alt=""/>
        </div>
    )
}