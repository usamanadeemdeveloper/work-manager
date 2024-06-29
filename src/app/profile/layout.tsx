import UserProvider from "@/context/userProvider";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UserProvider>
                {children}
            </UserProvider>
        </>
    );
}