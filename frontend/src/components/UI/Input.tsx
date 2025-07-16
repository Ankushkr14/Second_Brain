interface InputProps{
    id?: string;
    checked?: boolean,
    placeholder?: string;
    value?: string;
    type?: string;
    ref?: any;
    readOnly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean
}

export function Input({id, checked ,placeholder, value, ref, type, readOnly, onChange, required, onKeyDown, disabled}:InputProps){
    return (
        <div>
            <input
                checked = {checked}
                id={id}
                ref = {ref}
                placeholder={placeholder}
                value={value}
                type={type}
                readOnly={readOnly}
                onChange={onChange}
                required = {required}
                onKeyDown ={onKeyDown}
                disabled = {disabled}
                className="px-4 py-3 border rounded-xl m-1 w-full bg-white-300/50 border-gray-600/50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 ease-in-out backdrop-blur-sm"
            />
        </div>
    );
}