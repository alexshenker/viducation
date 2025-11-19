import { PropsWithChildren } from "react";

const ErrorBox = (props: PropsWithChildren): React.JSX.Element => {
    return (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 rounded text-red-700 dark:text-red-400">
            {props.children}
        </div>
    );
};

export default ErrorBox;
