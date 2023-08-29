import Dropdown from '@/components/ui/Dropdown'
import { useState } from 'react'
import {
    HiOutlineSwitchHorizontal,
    HiOutlineFlag,
    HiOutlineCog,
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
    getCategorizedArticles,
    toggleArticleDeleteConfirmation,
    toggleCategoryDeleteConfirmation,
    toggleCategoryRenameDialog,
    setSelected,
    useAppDispatch,
    useAppSelector,
    CategorizedArticles,
} from '../../../knowledge-base/ManageArticles/store'
import { toggleNewProjectDialog } from '../store'

const ItemDropdown = () => {
    const dispatch = useAppDispatch()

    const [collapse, setCollapse] = useState(false)

    const navigate = useNavigate()

    const onArticleEdit = (id: string) => {
        navigate(`/app/knowledge-base/edit-article?id=${id}&categoryLabel=`)
    }

    const onArticleAdd = () => {
        dispatch(toggleNewProjectDialog(true))
    }

    const onCategoryRename = () => {
        dispatch(toggleCategoryRenameDialog(true))
    }

    const onCategoryDelete = () => {
        dispatch(setSelected({ id: '', categoryValue: 1 }))
        dispatch(toggleCategoryDeleteConfirmation(true))
    }
    return (
        <Dropdown>
            <Dropdown.Item eventKey="addArticle" onClick={() => onArticleAdd()}>
                Add article
            </Dropdown.Item>
            <Dropdown.Item eventKey="rename" onClick={onCategoryRename}>
                Rename
            </Dropdown.Item>
            <Dropdown.Item eventKey="delete" onClick={onCategoryDelete}>
                Delete
            </Dropdown.Item>
        </Dropdown>
    )
}

export default ItemDropdown
