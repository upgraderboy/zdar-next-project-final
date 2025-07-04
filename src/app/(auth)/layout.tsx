export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex items-center justify-center h-screen">{children}</div>
        </>
    );
}