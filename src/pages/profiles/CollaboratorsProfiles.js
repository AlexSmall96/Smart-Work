import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CollaboratorsProfiles = () => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    collaboratorsProfiles: { results: [] },
  });
  const { collaboratorsProfiles } = profileData;
  const currentUser = useCurrentUser();
// Need to filter profiles based on users collaborators //
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/"
        );
        console.log(data)
        setProfileData((prevState) => ({
          ...prevState,
          collaboratorsProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container>
      {collaboratorsProfiles.results.length ? (
        <>
          <p>Your collaborators profiles:</p>
          {collaboratorsProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default CollaboratorsProfiles;