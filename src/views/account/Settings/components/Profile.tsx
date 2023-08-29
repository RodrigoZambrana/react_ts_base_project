import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik, useFormik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineUser,
    HiCheck,
    HiEye,
    HiTrash,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import { useAppSelector } from '@/store'
import useAuth from '@/utils/hooks/useAuth'
import updateProfile from '@/utils/hooks/useUser'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useUser from '@/utils/hooks/useUser'
import { useState } from 'react'
import { ConfirmDialog } from '@/components/shared'
import { Dialog } from '@/components/ui'
import { deletePhoto } from '../../../../@types/user'
import Disabled from '../../../ui-components/forms/Upload/Disabled'

export type ProfileFormModel = {
    id?: number
    name?: string
    lastName?: string
    email?: string
    profilePicture?: string
    avatar?: string
    foto?: File
}

type ProfileProps = {
    data?: ProfileFormModel
}
type Image = {
    img: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimo 6 caracteres')
        // .max(12, 'Too Long!')
        .required('Ingrese Nombre'),
    email: Yup.string().email('Email invalido').required('Ingrese Email'),
    lastName: Yup.string().required('Ingrese Apellido'),
    avatar: Yup.string(),
})

const Profile = ({
    data = {
        id: useAppSelector((state) => state.auth.user.id),
        name: useAppSelector((state) => state.auth.user.firstName),
        lastName: useAppSelector((state) => state.auth.user.lastName),
        email: useAppSelector((state) => state.auth.user.email),
        avatar: useAppSelector((state) => state.auth.user.profilePicture),
    },
}: ProfileProps) => {
    const onSetFormFile = (
        form: FormikProps<ProfileFormModel>,
        field: FieldInputProps<ProfileFormModel>,
        files: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(files[0]))
        form.setFieldValue('foto', files[0])
    }

    const [message, setMessage] = useTimeOutMessage()
    const { updateProfile, deletePhoto } = useUser()
    const [selectedImg, setSelectedImg] = useState<string>({} as string)
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const id = useAppSelector((state) => state.auth.user.id)

    const onViewOpen = (img: string) => {
        setSelectedImg(img)
        setViewOpen(true)
        console.log('imagen', img)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({} as string)
        }, 300)
    }

    const onDeleteConfirmation = (img: string) => {
        setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({} as string)
        setDeleteConfirmationOpen(false)
    }

    const onDelete = async () => {
        const result = await deletePhoto(id)
        toast.push(<Notification title={result?.message} type="success" />, {
            placement: 'top-center',
        })
        setDeleteConfirmationOpen(false)
    }

    const onFormSubmit = async (
        values: ProfileFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { id, name, lastName, email, foto } = values
        setSubmitting(true)
        const result = await updateProfile({
            id,
            firstName: name,
            lastName,
            email,
            foto,
        })
        if (result?.status === 'failed') {
            setMessage(result.message)
        }
        toast.push(<Notification title={result?.message} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="General"
                                    desc="Información básica de contacto"
                                />
                                <FormRow
                                    name="avatar"
                                    label="Foto"
                                    {...validatorProps}
                                >
                                    <Field name="avatar">
                                        {({ field, form }: FieldProps) => {
                                            const avatarProps = field.value
                                                ? { src: field.value }
                                                : {}
                                            return (
                                                <>
                                                    <Avatar
                                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                        size={160}
                                                        shape="circle"
                                                        icon={<HiOutlineUser />}
                                                        {...avatarProps}
                                                    />
                                                    <Upload
                                                        draggable
                                                        className="min-h-fit rounded border p-3 mt-3 flex"
                                                        showList={false}
                                                        uploadLimit={1}
                                                        onChange={(files) =>
                                                            onSetFormFile(
                                                                form,
                                                                field,
                                                                files
                                                            )
                                                        }
                                                        onFileRemove={(files) =>
                                                            onSetFormFile(
                                                                form,
                                                                field,
                                                                files
                                                            )
                                                        }
                                                    ></Upload>
                                                    {field.value != '' && (
                                                        <div className=" group absolute inset-2 text-xl  pl-10 pt-20 flex">
                                                            <span
                                                                className=" hover:text-gray-300 cursor-pointer"
                                                                onClick={() =>
                                                                    onViewOpen(
                                                                        field.value
                                                                    )
                                                                }
                                                            >
                                                                <HiEye />
                                                            </span>
                                                            <span
                                                                className=" hover:text-gray-300 cursor-pointer"
                                                                onClick={() =>
                                                                    onDeleteConfirmation(
                                                                        field.value
                                                                    )
                                                                }
                                                            >
                                                                <HiTrash />
                                                            </span>
                                                        </div>
                                                    )}
                                                </>
                                            )
                                        }}
                                    </Field>
                                </FormRow>
                                <FormRow
                                    name="email"
                                    label="Email"
                                    {...validatorProps}
                                >
                                    <Field
                                        disabled={true}
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                        prefix={
                                            <HiOutlineMail className="text-xl" />
                                        }
                                    />
                                </FormRow>
                                <FormRow
                                    name="name"
                                    label="Nombre"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="name"
                                        placeholder="Name"
                                        component={Input}
                                        prefix={
                                            <HiOutlineUserCircle className="text-xl" />
                                        }
                                    />
                                </FormRow>
                                <FormRow
                                    name="lastName"
                                    label="Apellido"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="lastName"
                                        placeholder="Apellido"
                                        component={Input}
                                        prefix={
                                            <HiOutlineUserCircle className="text-xl" />
                                        }
                                    />
                                </FormRow>
                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        type="button"
                                        onClick={() => resetForm()}
                                    >
                                        Restablecer
                                    </Button>
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Actualizando'
                                            : 'Guardar'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>

            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Foto de perfil</h5>
                <img className="w-full" src={selectedImg} />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove image"
                confirmButtonColor="red-600"
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
            >
                <p> Are you sure you want to remove this image? </p>
            </ConfirmDialog>
        </>
    )
}

export default Profile
