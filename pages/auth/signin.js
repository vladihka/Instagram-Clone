import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function signin({providers}){
    return(
        <>
            <Header></Header>
            <div className="flex justify-center space-x-7 mt-2">
                <img
                    className="hidden object-cover rotate-6 md:inline-flex md:w-48"
                    src="https://www.digi-follower.com/en/wp-content/uploads/2023/06/get-Instagram-Story-Views-100-real-and-Guaranteed-with-instant-delivery.webp" alt="instagram-image"/>
                <div>
                     {Object.values(providers).map((provider) => (
                        <div key={provider.name} className="flex flex-col items-center">
                            <img
                                className="w-32 object-cover"
                                src="https://www.mouton.pl/gfx/blog/2019-05/2019_05_23_05_39_56_instagram-logo-2.png" alt=""/>
                            <p className="text-sm italic my-10 text-center">This app is created for learning purposes</p>
                            <button
                                onClick={() => signIn(provider.id,{ callbackUrl: "/"})}
                                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">Sign in with Google</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context){
    const providers = await getProviders()
    return {
        props: {providers}
    }
}