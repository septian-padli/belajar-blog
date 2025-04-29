interface ErrorPageProps {
    message: string
}
const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
    return (
        <div>
            ERROR: {message}
        </div>
    )
}

export default ErrorPage