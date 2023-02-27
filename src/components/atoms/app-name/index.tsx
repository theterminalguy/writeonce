import AppLogo from "../AppLogo";
import "./index.css";

interface AppNameProps {
  withLogo?: boolean;
}

const AppName = ({ withLogo }: AppNameProps) => {
  return (
    <div className="vanilla__app__name__container">
      {withLogo ? <AppLogo /> : null}
      <div className="vanilla__app__name">
        <span>write</span>
        <span>once</span>
      </div>
    </div>
  );
};

export default AppName;
