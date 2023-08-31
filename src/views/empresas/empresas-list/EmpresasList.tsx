import ActionBar from './components/ActionBar'
import EmpresasListContent from './components/EmpresasListContent'
import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import AddEmpleadoDialog from '@/views/project/ProjectList/components/AddEmployeeDialog'
import AddEmployeeDialog from '@/views/project/ProjectList/components/AddEmployeeDialog'

injectReducer('projectList', reducer)

const EmpresasList = () => {
    return (
        <Container className="h-full">
            <ActionBar />
            <EmpresasListContent />
            <NewProjectDialog />
            <AddEmployeeDialog />
        </Container>
    )
}

export default EmpresasList
