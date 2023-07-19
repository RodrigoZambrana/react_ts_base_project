import ActionBar from './components/ActionBar'
import EmpresasListContent from './components/EmpresasListContent'
import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('projectList', reducer)

const EmpresasList = () => {
    return (
        <Container className="h-full">
            <ActionBar />
            <EmpresasListContent />
            <NewProjectDialog />
        </Container>
    )
}

export default EmpresasList
