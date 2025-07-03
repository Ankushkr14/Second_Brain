import { CloseIcon } from "./icons/closeIcon";
import { Button } from "./UI/Buttton";
import { Input } from "./UI/Input";


export function CreateContentModel({open, onClose}:any){
    return <div>
        {open && (
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center ">
                <div className = "flex flex-col justify-center">
                    <span className=" bg-white opacity-100 p-4 rounded-lg">
                        <div onClick={onClose} className="flex justify-end cursor-pointer">
                            <CloseIcon size="md"/>
                        </div>
                        <div className="">
                            <Input placeholder="Title" />
                            <Input placeholder="text" />
                        </div>
                        <div className="flex justify-center">
                            <Button variant="primary" size="md" text="Submit" onClick={()=>{}}/>
                        </div>

                    </span>
                </div>
            </div>
        )}
    </div>
}