// import "animate.css";
import "./index.css";

export default function Snackbar({
  message,
  position,
  animation,
  action,
}: SnackbarProps) {
  const animationClass = animation
    ? `animate__animated ${animation}`
    : "animate__animated";
  return (
    <div className={`snackbar show-${position} ${animationClass}`}>
      <div className="snackbar__content">
        <div className="snackbar__message">
          <p>{message}</p>
        </div>
        {action && (
          <div className="snackbar__action">
            <button className="snackbar__action-button" type="button">
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type SnackbarProps = {
  message: string;
  position: "top" | "bottom";
  animation?: string;
  action?: {
    label: string;
    controller: string;
    action: string;
  };
};
