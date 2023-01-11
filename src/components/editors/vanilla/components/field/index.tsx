import { PlaceholderState } from "../../../../../store/features/placeholder/placeholderSlice";
interface FieldProps {
  args: PlaceholderState;
}

export default function Field({ ...props }: FieldProps) {
  return (
    <div className="vanilla__placeholder-field" id="vanilla__field">
      <label>{props.args.name}</label>
      <input type={ props.args.dataType === 'string' ? 'text':  props.args.dataType } id="placeholder-type-Y5ei-Cn52i" className="vanilla__form-control vanilla__form-control-Y5ei-Cn52i" name="dataType" />
    </div>
  )
}