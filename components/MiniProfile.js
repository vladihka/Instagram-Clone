export default function MiniProfile(){
    return(
        <div className="flex items-center justify-between mt-14 ml-10">
            <img
                className="h-16 rounded-full border p-[2px]"
                src="https://media.licdn.com/dms/image/C4E03AQFbkO6E7nvOYQ/profile-displayphoto-shrink_800_800/0/1655032591139?e=2147483647&v=beta&t=vLFbMqVJpf-hgFUevz4UWnlGasQok9gYhI_RpU6KsOg" alt="user-image"/>
            <div className="flex-1 ml-4">
                <h2 className="font-bold">codewithvladihka</h2>
                <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
            </div>
            <button className="font-semibold text-blue-400 text-sm">Sign out</button>
        </div>
    )
}