"use client";


import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session , status } = useSession();
  const [providers, setUpProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setUpProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 p-4">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Promptopia logo"
        />
        <p className="logo-text">Promptopia</p>
      </Link>


      {/*Desktop Navigation*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div>
            <div className="flex gap-3 md:gap-5">
              <Link className="black_btn" href="/create-prompt">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                SignOut
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  signIn
                </button>
              ))}
          </>
        )}
      </div>

      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  signIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;


//reached to 1:15:59