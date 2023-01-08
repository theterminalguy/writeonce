import ConfirmModal from '../editors/vanilla/components/modal/confirm';
import './index.css';

export const Storybook = () => {

  return (
    <div className="storybook">
      <ConfirmModal
        id={"modal"}
        message="Do you want to replace this placeholder?"
        defaultDisplay="block"
        config={{
          controller: "hello",
          onYes: "onYes",
          onNo: "onNo",
        }}
      />
    </div>
  );
};
