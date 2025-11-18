import { useId } from "react";
import Label from "./Label";

interface Props {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const Input = (props: Props): React.JSX.Element => {
    const id = useId();

    return (
        <div>
            {props.label && <Label id={id}>{props.label}</Label>}
            <input
                className="p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                id={id}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default Input;
