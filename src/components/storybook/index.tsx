import './index.css';
import ConfirmModal from '../editors/vanilla/components/modal/confirm/index';
export const Storybook = () => {

  return (
    <div className="storybook">
      <ConfirmModal
        id={"modal"}
        message="Do you want to replace this placeholder?"
        defaultDisplay="block"
        config={{
          controller: "confirm-modal",
          onYes: "onYes",
          onNo: "onNo",
        }}
      />
    </div>
  );
};
