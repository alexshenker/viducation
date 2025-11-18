import { useId } from "react";
import Label from "./Label";

interface Props {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label?: string;
    rows?: number;
}

const Textarea = (props: Props): React.JSX.Element => {
    const id = useId();

    return (
        <div>
            {props.label && <Label id={id}>{props.label}</Label>}
            <textarea
                className="p-2 mt-0.5 w-full border resize-none rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                id={id}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                rows={props.rows || 2}
            />
        </div>
    );
};

export default Textarea;
