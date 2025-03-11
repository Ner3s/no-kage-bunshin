import checkboxStyles from './checkbox.module.scss';

type CheckboxProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Checkbox({ label, ...rest }: CheckboxProps) {
  return (
    <label className={checkboxStyles.container}>
      <input
        {...rest}
        type="checkbox"
        className={checkboxStyles.inputCheckbox}
      />
      <span className={checkboxStyles.checkmark}></span>
      <span className={checkboxStyles.label}>{label}</span>
    </label>
  );
}

export default Checkbox;
