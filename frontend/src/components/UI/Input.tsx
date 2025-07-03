interface InputProps{
    placeholder?: string;
    text?: string;
    type?: string;
    ref?: any;
}

export function Input({placeholder, text, ref, type}:InputProps){
    return (
        <div>
            <input
                ref = {ref}
                placeholder={placeholder}
                value={text}
                type={type}
                className="px-4 py-2 border rounded m-2"
            />
        </div>
    );
}