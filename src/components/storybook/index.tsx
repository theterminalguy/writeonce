import PlaceholderItem from '../editors/vanilla/components/PlaceholderSidePanel/PlaceholderItem';
import ConfirmModal from '../editors/vanilla/components/modal/confirm';
import './index.css';
import AlertModal from '../editors/vanilla/components/modal/alert/index';
import Snackbar from '../snackbar';

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

      <PlaceholderItem placeholderName="Placeholder 1" placeholderId="1" count={1} />

      <AlertModal 
        id={"modal"}
        message="You have reached the maximum number of placeholders"
        defaultDisplay="block"
        config={{
          controller: "hello",
          onOk: "onOk",
        }}
      />

      <Snackbar 
        message="Placeholder 1 has been deleted"
        position="top"
        animation='animate__fadeOut'
      />
    </div>
  );
};
