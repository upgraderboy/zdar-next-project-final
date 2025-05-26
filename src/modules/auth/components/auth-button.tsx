"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { UserCircleIcon } from "lucide-react"
import { usePathname } from "next/navigation"

export const AuthButton = () => {
    const { isLoaded } = useUser()
    const pathName = usePathname();
    // !isSignedIn ? (
    //     <Skeleton className="px-12 py-6 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:size-4 border" />
    // ) : 
    if (!isLoaded) {
        return (
            <>
                {
                    (
                        <Skeleton className="h-9 w-9 rounded-full bg-blue-600 border" />
                    )
                }
            </>
        )
    }

    return (
        <>
            <SignedIn>
                <UserButton>
                    {
                        pathName !== "/candidates" && pathName !== "/companies" ? (
                            <UserButton.MenuItems>
                            </UserButton.MenuItems>
                        ) : (
                            <UserButton.MenuItems>
                            </UserButton.MenuItems>
                        )
                    }
                </UserButton>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:size-4" variant="outline">
                        <UserCircleIcon /> Sign In
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    )
}