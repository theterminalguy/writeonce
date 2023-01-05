import Modal from "../editors/vanilla/components/modal";
import { increment } from "../../store/features/counter/counterSlice";
import { store } from "../../store";
export const Storybook = () => {

  return (
    <div className="storybook">
      <Modal
        id={"modal"}
        title="Do you want to replace this placeholder?"
        hasInput={false}
        defaultDisplay="block"
        handleOk={() => store.dispatch(increment())}
        handleCancel={() => console.log("cancel")}
      />
    </div>
  );
};
