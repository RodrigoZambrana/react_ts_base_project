import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetProjectList,
    apiGetScrumBoardtMembers,
    apiPutProjectList,
} from '@/services/ProjectService'

type Member = {
    id: string
    name: string
    email: string
    img: string
}

type Project = {
    id: number
    name: string
    rut: string
    address: string
    description: string
}

type ProjectList = Project[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetProjectListRequest = Query

type GetProjectListResponse = ProjectList

type GetScrumBoardtMembersResponse = {
    allMembers: Member[]
}

type PutProjectListRequest = {
    name: string
    description: string
    rut: string
    address: string
}

type PutProjectListResponse = ProjectList

export type ProjectListState = {
    loading: boolean
    projectList: ProjectList
    allMembers: {
        value: string
        label: string
        img: string
    }[]
    view: 'grid' | 'list'
    query: Query
    newProjectDialog: boolean
    newEmpleadoDialog: boolean
}

export const SLICE_NAME = 'projectList'

export const getList = createAsyncThunk(
    SLICE_NAME + '/getList',
    async (data: GetProjectListRequest) => {
        const response = await apiGetProjectList<
            GetProjectListResponse,
            GetProjectListRequest
        >(data)
        return response.data
    }
)

export const getMembers = createAsyncThunk(
    SLICE_NAME + '/getMembers',
    async () => {
        const response =
            await apiGetScrumBoardtMembers<GetScrumBoardtMembersResponse>()
        const data = response.data.allMembers.map((item) => ({
            value: item.id,
            label: item.name,
            img: item.img,
        }))
        return data
    }
)

export const putProject = createAsyncThunk(
    SLICE_NAME + '/putProject',
    async (data: PutProjectListRequest) => {
        const response = await apiPutProjectList<
            GetProjectListResponse,
            PutProjectListRequest
        >(data)
        return response.data
    }
)

const initialState: ProjectListState = {
    loading: false,
    projectList: [],
    allMembers: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    newProjectDialog: false,
    newEmpleadoDialog: false,
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleView: (state, action) => {
            state.view = action.payload
        },
        toggleSort: (state, action) => {
            state.query.sort = action.payload
        },
        setSearch: (state, action) => {
            state.query.search = action.payload
        },
        toggleNewProjectDialog: (state, action) => {
            state.newProjectDialog = action.payload
        },
        toggleNewEmpleadoDialog: (state, action) => {
            state.newEmpleadoDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.fulfilled, (state, action) => {
                state.projectList = action.payload
                state.loading = false
            })
            .addCase(getList.pending, (state) => {
                state.loading = true
            })
            .addCase(getMembers.fulfilled, (state, action) => {
                state.allMembers = action.payload
            })
            .addCase(putProject.fulfilled, (state, action) => {
                state.projectList = action.payload
            })
    },
})

export const {
    toggleView,
    toggleSort,
    toggleNewProjectDialog,
    toggleNewEmpleadoDialog,
    setSearch,
} = projectListSlice.actions

export default projectListSlice.reducer
