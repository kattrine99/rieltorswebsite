import { useEffect, useState } from "react";
import { Header, Heading } from "../../components"
import { useGetUserByIdQuery } from "../../Store/api/auth.api";

interface IUser {
    id: number;
    status: 0 | 1;
    name: string;
    email: string;
    city: string;
    profilePicture?: string;
}
export const ProfilePage = () => {
    const { data: userData, isLoading, error } = useGetUserByIdQuery(user);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    useEffect(() => {
        if (user?.profilePicture) {
            setProfilePicture(user.profilePicture);
        }
    }, [user]);

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setProfilePicture(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load user data</p>;

    return (
        <><Header />
            <div style={{ textAlign: "center", padding: "20px" }}>
                <Heading text={"Profile Page"} level={1} className={""} />
                <div>
                    <label htmlFor="profile-picture">
                        <img
                            src={profilePicture || "/default-profile.png"}
                            alt="Profile"
                            style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                cursor: "pointer",
                            }} />
                    </label>
                    <input
                        type="file"
                        id="profile-picture"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleProfilePictureChange} />
                </div>
                {user && (
                    <div style={{ marginTop: "20px" }}>
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>City: {user.city}</p>
                    </div>
                )}
            </div></>
    );
}
