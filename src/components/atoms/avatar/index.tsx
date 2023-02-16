import { Avatar } from "@mantine/core";
import "./index.css";

interface AvatarIconProps {
  image: string;
}

const AvatarIcon = ({ image }: AvatarIconProps) => {
  return (
    <div className="vanilla__avatar">
      <Avatar src={image} alt="avatar" radius={100} size={30} />
    </div>
  );
};

export default AvatarIcon;
