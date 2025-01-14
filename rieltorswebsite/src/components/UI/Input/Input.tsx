import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage: string | undefined;
    isError: boolean;
}

export const Input = ({ type, placeholder,isError, errorMessage, ...props }: InputProps) => {


    return (
        <div className="input-container">
            <input
                type={type}
                placeholder={placeholder}
                {...props}
            />
            {isError && <p style={{ color: "red", marginBottom: "4px" }}>{errorMessage}</p>}
        </div>
    );
};