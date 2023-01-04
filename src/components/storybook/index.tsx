import Modal from "../editors/vanilla/components/modal";

export const Storybook = () => {
  return (
    <div className="storybook">
      <Modal
        id={"modal"}
        title="Do you want to replace this placeholder?"
        hasInput={false}
        defaultDisplay="block"
        handleOk={() => console.log("ok")}
        handleCancel={() => console.log("cancel")}
      />
    </div>
  );
};
