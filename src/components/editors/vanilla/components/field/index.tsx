import { PlaceholderState } from "../../../../../store/features/placeholder/placeholderSlice";

interface FieldProps {
  args: PlaceholderState;
}

const getField = (type: string) => {
  var html = null;
  switch(type) {
    case 'string':
      html = document.createElement("text")
      break;
    default:
      break;
  }
  html?.setAttribute("class", "vanilla__form-control vanilla__form-control-Y5ei-Cn52i");
  return html;
}

export default function Field({ ...props }: FieldProps) {
  return (
    <div className="vanilla__placeholder-field" >
      <label>{props.args.name}</label>
      {}
      <input type="text" id="placeholder-type-Y5ei-Cn52i" className="vanilla__form-control vanilla__form-control-Y5ei-Cn52i" name="dataType" />
    </div>
  )
}