import Dialog from '@/components/ui/Dialog'
import NewProjectForm from '../../../project/ProjectList/components/NewProjectForm'
import {
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector,
} from '../../../project/ProjectList/store'

const Confirmations = ({ rename }: { rename: boolean }) => {
    const dispatch = useAppDispatch()

    const newProjectDialog = useAppSelector(
        (state) => state.projectList.data.newProjectDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewProjectDialog(false))
    }

    return (
        <Dialog
            isOpen={newProjectDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Agregar Empresa</h4>
            <div className="mt-4">
                <NewProjectForm />
            </div>
        </Dialog>
    )
}

export default Confirmations
