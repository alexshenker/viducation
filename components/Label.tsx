interface Props {
    id: string;
    children: React.ReactNode;
}

const Label = (props: Props): React.JSX.Element => {
    return (
        <label
            htmlFor={props.id}
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
            {props.children}
        </label>
    );
};

export default Label;
