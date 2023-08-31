import Dropdown from '@/components/ui/Dropdown'
import { useState } from 'react'
import {
    HiOutlineSwitchHorizontal,
    HiOutlineFlag,
    HiOutlineCog,
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
    toggleNewEmpleadoDialog,
    useAppDispatch,
    useAppSelector,
} from '../../../empresas/empresas-list/store'

const ItemDropdown = () => {
    const dispatch = useAppDispatch()

    const [collapse, setCollapse] = useState(false)

    const navigate = useNavigate()

    const onArticleEdit = (id: string) => {
        navigate(`/app/knowledge-base/edit-article?id=${id}&categoryLabel=`)
    }

    const onArticleAdd = () => {
        dispatch(toggleNewEmpleadoDialog(true))
    }

    const onCategoryRename = () => {}

    const onCategoryDelete = () => {}
    return (
        <Dropdown>
            <Dropdown.Item eventKey="addArticle" onClick={() => onArticleAdd()}>
                Agregar empleados
            </Dropdown.Item>
            <Dropdown.Item eventKey="rename" onClick={onCategoryRename}>
                Editar empresa
            </Dropdown.Item>
            <Dropdown.Item eventKey="delete" onClick={onCategoryDelete}>
                Eliminar empresa
            </Dropdown.Item>
        </Dropdown>
    )
}

export default ItemDropdown
