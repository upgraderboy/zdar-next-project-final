"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { HomeIcon, LibraryIcon, FlameIcon, Currency, User2Icon, HeartIcon, FormInputIcon, FileIcon } from "lucide-react"
// import { useClerk } from "@clerk/nextjs"
import Link from "next/link"
import { Roles } from "../../types/globals"
const candidateItems = [
    {
        title: "My Profile",
        href: "/profile",
        icon: User2Icon,
        auth: true
    },
    {
        title: "My Resume",
        href: "/resume",
        icon: FormInputIcon,
        auth: true
    },
    {
        title: "My Job Applications",
        href: "applications",
        icon: FormInputIcon,
        auth: true
    },
    {
        title: "Favorite Jobs",
        href: "/favorites",
        icon: FileIcon,
        auth: true
    },
    {
        title: "All Candidates",
        href: "/candidates",
        icon: FileIcon,
        auth: true
    },
    {
        title: "All Jobs",
        href: "/jobs",
        icon: HeartIcon,
        auth: true
    },
    {
        title: "All Companies",
        href: "/companies",
        icon: FileIcon,
        auth: true
    },
    {
        title: "Jobs Analytics",
        href: "/analysis/jobs",
        icon: FileIcon,
        auth: true
    }
]
const companyItems = [
    {
        title: "My Profile",
        href: "/profile",
        icon: LibraryIcon
    },
    {
        title: "New Job",
        href: "/jobs/create",
        icon: FlameIcon,
    },
    {
        title: "Favorite Candidates",
        href: "/favorites",
        icon: Currency,
    },
    {
        title: "My Job Applications",
        href: "/applications",
        icon: FlameIcon,
    },
    {
        title: "All Candidates",
        href: "/candidates",
        icon: FileIcon,
        auth: true
    },
    {
        title: "All Jobs",
        href: "/jobs",
        icon: HeartIcon,
        auth: true
    },
    {
        title: "All Companies",
        href: "/companies",
        icon: FileIcon,
        auth: true
    },
    {
        title: "Candidate Analytics",
        href: "/analysis/candidates",
        icon: FileIcon,
        auth: true
    }
]
const defaultItems = [
    {
        title: "Home",
        href: "/",
        icon: HomeIcon
    },
    {
        title: "About",
        href: "/about",
        icon: LibraryIcon
    },
    {
        title: "Services",
        href: "/services",
        icon: FlameIcon,
    },
    {
        title: "Partnerships & Media",
        href: "/partnership-media",
        icon: FlameIcon,
    },
    {
        title: "Pricing Plan",
        href: "/pricing-plan",
        icon: Currency,
    },
    {
        title: "Contact",
        href: "/contact",
        icon: FlameIcon,
    }
]
export const NavigationSidebar = ({ role, userId }: { role?: Roles, userId?: string }) => {
    console.log(role, userId);
    // const user = useClerk();
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            <SidebarContent>
                {
                    role === "CANDIDATE" && (
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {candidateItems.map((item) => {
                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton tooltip={item.title} asChild isActive={false} onClick={() => {
                                                    // if (!userId) {
                                                    // e.preventDefault();
                                                    // return user.openSignIn({
                                                    //     redirectUrl: window.location.href,
                                                    // });
                                                    // }
                                                }}>
                                                    <Link href={item.href} className="flex items-center gap-4">
                                                        <item.icon />
                                                        <span className="text-sm">{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                }
                <Separator />
                {
                    !userId && (
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {defaultItems.map((item) => {
                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton tooltip={item.title} asChild isActive={false} onClick={(e) => {
                                                    // if (!userId) {
                                                    e.preventDefault();
                                                    // return user.openSignIn({
                                                    //     redirectUrl: window.location.href,
                                                    // });
                                                    // }
                                                }}>
                                                    <Link href={item.href} className="flex items-center gap-4">
                                                        <item.icon />
                                                        <span className="text-sm">{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                }
                <Separator />
                {
                    role === "COMPANY" && (
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {companyItems.map((item) => {
                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton tooltip={item.title} asChild isActive={false} onClick={() => {
                                                    // if (userId) {
                                                    // e.preventDefault();
                                                    // return user.openSignIn({
                                                    //     redirectUrl: window.location.href,
                                                    // });
                                                    // }
                                                }}>
                                                    <Link href={item.href} className="flex items-center gap-4">
                                                        <item.icon />
                                                        <span className="text-sm">{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                }
            </SidebarContent>
        </Sidebar>
    )
}