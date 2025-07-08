import { WarningIcon } from "./icons/warningIcon";
import { Button } from "./UI/Buttton";

interface DeleteConfirmationModalProps{
    open: boolean;
    onClose:()=> void;
    onDelete: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

export function DeleteConfirmationModal (props: DeleteConfirmationModalProps){

    if(!props.open) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center mr-3">
                        <WarningIcon/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{props.title}</h3>
                </div>
                {/* Message */}
                <p className="font-bold text-gray-600 mb-4">{props.message}</p>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                    <Button
                        variant="secondary"
                        text={props.cancelText}
                        size = 'md'
                        onClick={props.onClose}
                        loading = {props.isLoading}
                    />
                    <Button
                        variant="danger"
                        text={props.confirmText}
                        size="md"
                        onClick={props.onDelete}
                        loading={props.isLoading}
                    />
                </div>
            </div>
        </div>
    );
}