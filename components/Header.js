import Image from 'next/image';
import React from 'react';
import {PlusCircleIcon, SearchIcon} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/outline";
import {useSession, signIn, signOut} from "next-auth/react";
import {useRecoilState} from "recoil";
import {modalState} from "../atom/modalAtom";
import {useRouter} from "next/router";

export default function Header() {

    const [open, setOpen] = useRecoilState(modalState);

    const {data:session} = useSession();

    const router = useRouter();
    //console.log(session);
    return (
        <div className="shadow-sm border-b sticky top-0 bg-white z-30">
            <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
                <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
                    <Image
                        src="http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png"
                        layout='fill'
                        className="object-contain"
                        onClick={() => router.push("/")}
                    />
                </div>
                <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png"
                        layout='fill'
                        className="object-contain"
                    />
                </div>

                <div className="relative mt-1">
                    <div className="absolute top-2 left-2">
                        <SearchIcon className="h-5 text-gray-500"></SearchIcon>
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black
                       rounded-md"
                    />
                </div>
                <div className="flex space-x-4 items-center">
                    <HomeIcon
                        onClick={() => router.push("/")}
                        className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"></HomeIcon>
                    {session ? (
                        <>
                            <PlusCircleIcon
                                onClick={() => setOpen(true)}
                                className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"></PlusCircleIcon>
                            <img
                                onClick={signOut}
                                src={session.user.image}
                                alt="user-image"
                                className="h-10 rounded-full cursor-pointer"></img>
                        </>
                    ) : (
                        <button onClick={signIn}>Sign in</button>
                    )}
                </div>
            </div>
        </div>
    );
}
