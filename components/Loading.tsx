interface Props {
    text?: string;
}

const Loading = (props: Props): React.JSX.Element => {
    return (
        <div className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-gray-300 dark:border-zinc-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto" />
                {props.text !== undefined && (
                    <p className="text-gray-600 dark:text-gray-400">
                        {props.text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Loading;
