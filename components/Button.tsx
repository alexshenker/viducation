import { PropsWithChildren } from "react";

interface Props {
    onClick?: () => void;
    disabled?: boolean;
    size?: "sm" | "md";
}

const Button = (props: PropsWithChildren<Props>): React.JSX.Element => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={`rounded-sm border border-gray-200 px-${
                props.size === "sm" ? "1" : "3"
            } py-${
                props.size === "sm" ? "0" : "1"
            } font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white active:scale-95 disabled:active:scale-100`}
        >
            {props.children}
        </button>
    );
};

export default Button;
