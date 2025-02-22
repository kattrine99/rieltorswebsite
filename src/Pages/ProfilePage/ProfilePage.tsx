import { useEffect, useState } from "react";
import { Header, Heading, Input } from "../../components";
import { useGetUserByIdQuery } from "../../Store/api/auth.api";
import "./ProfilePage.scss";

export const ProfilePage = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");  
    if (storedUser) {
        if (!storedUser.startsWith("{")) {
          const userId = Number(storedUser);
          if (!isNaN(userId)) {
            setUserId(userId);
            return;
          } 
        }
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.user_id && !isNaN(Number(parsedUser.user_id))) {
          setUserId(Number(parsedUser.user_id));
        } 
      } 
  }, []);
  

  const { data: responseData, isLoading, error } = useGetUserByIdQuery(userId as number, {
    skip: userId === null || isNaN(userId),
  });

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const profilePic = reader.result as string;
          setProfilePicture(profilePic);
          localStorage.setItem("profilePicture", profilePic);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading || userId === null) return <p>Loading...</p>;
  if (error) return <p>Failed to load user data</p>;

  const user = responseData?.message;

  return (
    <>
      <Header />
      <Heading text={"Profile"} level={1} className={"ProfileTitle"} />
      <div className="ProfilePage">
        <div className="ProfileCard">
          <div className="ProfileLeft">
            <label htmlFor="profile-picture">
              <img
                src={profilePicture || "/images/icons/user.png"}
                alt="Profile"
              />
            </label>
            <Input
              type="file"
              id="profile-picture"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfilePictureChange}
              errorMessage={undefined}
              isError={false}
            />
            <Heading text={user?.name || "User Name"} level={2} className={""} />
          </div>
          <div className="ProfileRight">
            <Heading text={"Information"} level={3} className={""} />
            <div className="infoRow">
              <span>Email:</span>
              <p>{user?.mail || "Not provided"}</p>
            </div>
            <div className="infoRow">
              <span>Phone:</span>
              <p>{user?.phone_number || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
