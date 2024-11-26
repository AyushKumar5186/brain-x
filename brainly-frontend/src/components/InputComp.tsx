
interface InputProps {
    placeholder:string;
    reference?: any;

}

export function InputComp({reference, placeholder,}: InputProps) {
    return <div>
        <input type={"text"} placeholder={placeholder} className="px-4 py-2 border rounded m-2" 
        ref={reference} 
         />
    </div>
}