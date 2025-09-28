import { useNavigate } from "react-router-dom";

const ShareAchieve = () => {
  const navigate = useNavigate();

  return (
    <ShareAchievement
      achievement={{
        description: "completed my first eco-challenge",
        hashtags: "#GreenTrack #EcoFriendly",
        message: "You saved 5kg CO₂!",
      }}
      onClose={() => navigate(-1)} // 👈 Go back when closed
    />
  );
};
