import Dialog from '@/components/ui/Dialog'
import {
    toggleNewEmpleadoDialog,
    useAppDispatch,
    useAppSelector,
} from '../../../empresas/empresas-list/store'
import AddEmployeeForm from './AddEmployeeForm'

const AddEmployeeDialog = () => {
    const dispatch = useAppDispatch()

    const newProjectDialog = useAppSelector(
        (state) => state.projectList.data.newEmpleadoDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewEmpleadoDialog(false))
    }

    return (
        <Dialog
            isOpen={newProjectDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Agregar Empleado</h4>
            <div className="mt-4">
                <AddEmployeeForm />
            </div>
        </Dialog>
    )
}

export default AddEmployeeDialog
