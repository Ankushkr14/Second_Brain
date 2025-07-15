import { BrainIcon } from "../icons/brainIcon"
import { Button } from "../UI/Buttton"
import { useNavigate } from "react-router-dom"

export const NavigationBar = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="flex justify-between items-center p-6 text-white max-w-7xl mx-auto">
                <div className="text-2xl font-bold flex items-center gap-2">
                    <BrainIcon/>
                    Second Brain
                </div>
                <div className="flex space-x-4">
                    <Button
                        variant="secondary"
                        text="Login"
                        size="md"
                        onClick={() => { navigate('/signin'); }}
                    />
                    <Button
                        variant="primary"
                        text="Register"
                        size="md"
                        onClick={() => { navigate('/signup'); }}
                    />
                </div>
            </div>
        </div>
    )
}