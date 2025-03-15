import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

export default function ConsumerLayout({
  children,
} : Readonly<{children: ReactNode}>){
  return(
    <>
      <Navbar />
      {children}
    </>
  )
}

function Navbar(){
  return(
    <header className="flex h-12 shadow z-10 p-3">
      <nav className="flex gap-4 container">
        <Link className="mr-auto hover:underline"
        href="/">
          Web Dev
        </Link>
        <Suspense>
          <SignedIn>
            <Link 
              className="flex items-center px-2"
              href="/courses" >
                  My Courses
              </Link>
            <Link 
              className="flex items-center px-2"
              href="/purchases" >
                  Purchases
              </Link>
              <div className="size-8 self-center">
                <UserButton 
                appearance={{
                  elements:{
                    userButtonAvatarBox: {
                      width: "100%", height:"100%"
                    },
                  }}
                }/>

              </div>
          </SignedIn > 
        </Suspense>
        <Suspense>
          <SignedOut>
            <Button className="self-center" asChild>
              <SignInButton/>
            </Button>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
  )
}